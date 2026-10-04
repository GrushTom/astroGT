#!/usr/bin/env node
/**
 * Firefly post Markdown validator.
 *
 * Read-only: it never rewrites the files it inspects. Fixing is the caller's job.
 *
 * Usage:
 *   node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs <file-or-dir> [...]
 *   node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs src/content/posts --json
 *
 * Options:
 *   --json          emit a machine-readable report instead of text
 *   --quiet         only print problems and the summary line
 *   --max-warnings N  exit 1 when warnings exceed N (default: warnings never fail)
 *
 * Exit codes: 0 = no errors, 1 = errors found (or warnings over --max-warnings), 2 = usage/IO failure.
 *
 * Field contract mirrors src/content.config.ts (zod schema) plus the `slug` key,
 * which is NOT in that schema but IS read by Astro's glob loader as `entry.id`
 * and therefore decides the public URL. See node_modules/astro/dist/content/loaders/glob.js.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const POSTS_DIR = path.join(PROJECT_ROOT, "src/content/posts");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

/** Frontmatter contract. `schema: false` marks keys the zod schema strips. */
const FIELDS = {
	title: { type: "string", required: true, nonEmpty: true },
	published: { type: "date", required: true },
	updated: { type: "date" },
	draft: { type: "boolean", default: false, conventional: true },
	description: { type: "string", default: "" },
	image: { type: "string", default: "" },
	tags: { type: "stringArray", default: [] },
	category: { type: "stringOrNull", default: "" },
	lang: { type: "string", default: "" },
	pinned: { type: "boolean", default: false, conventional: true },
	author: { type: "string", default: "" },
	sourceLink: { type: "string", default: "" },
	licenseName: { type: "string", default: "" },
	licenseUrl: { type: "string", default: "" },
	comment: { type: "boolean", default: true, conventional: true },
	password: { type: "string", default: "" },
	passwordHint: { type: "string", default: "" },
	series: { type: "string", default: "" },
	seriesOrder: { type: "number" },
	slug: { type: "string", schema: false },
	prevTitle: { type: "string", default: "", internal: true },
	prevSlug: { type: "string", default: "", internal: true },
	nextTitle: { type: "string", default: "", internal: true },
	nextSlug: { type: "string", default: "", internal: true },
};

/** The site renders `rehypeCallouts` with theme "github": only these five are styled. */
const GITHUB_CALLOUTS = new Set(["note", "tip", "important", "warning", "caution"]);
/** Types rehype-callouts recognises from other themes; they render but unstyled under "github". */
const OTHER_CALLOUTS = new Set([
	"abstract", "summary", "tldr", "info", "todo", "hint", "success", "check",
	"done", "question", "help", "faq", "attention", "failure", "fail", "missing",
	"danger", "error", "bug", "example", "quote", "cite",
]);

const MARKDOWN_EXT = /\.(?:md|mdx)$/i;

const args = process.argv.slice(2);
const options = {
	json: args.includes("--json"),
	quiet: args.includes("--quiet"),
	maxWarnings: Infinity,
};
const targets = args.filter((arg, index) => {
	if (arg === "--json" || arg === "--quiet") return false;
	if (arg === "--max-warnings") {
		const value = Number(args[index + 1]);
		if (Number.isFinite(value)) options.maxWarnings = value;
		return false;
	}
	if (args[index - 1] === "--max-warnings") return false;
	return !arg.startsWith("--");
});

if (targets.length === 0) {
	options.quiet = false;
	targets.push(path.relative(process.cwd(), POSTS_DIR) || ".");
}

/* ------------------------------------------------------------------ helpers */

function collectMarkdownFiles(target) {
	const absolute = path.resolve(target);
	let stats;
	try {
		stats = statSync(absolute);
	} catch {
		throw new Error(`path does not exist: ${target}`);
	}
	if (stats.isFile()) return MARKDOWN_EXT.test(absolute) ? [absolute] : [];

	const found = [];
	const walk = (dir) => {
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (entry.isFile() && MARKDOWN_EXT.test(entry.name)) found.push(full);
		}
	};
	walk(absolute);
	return found.sort();
}

/** The `entry.id` Astro's glob loader derives when frontmatter has no `slug`. */
function fileDerivedId(filePath) {
	const relative = path.relative(POSTS_DIR, filePath).replaceAll("\\", "/");
	let id = relative.replace(MARKDOWN_EXT, "");
	if (id.endsWith("/index")) id = id.slice(0, -"/index".length);
	return id;
}

/** Parse the YAML frontmatter ourselves so we can see keys the zod schema strips. */
function parseFrontmatter(raw) {
	const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
	if (!match) return null;
	const result = matter(`---\n${match[1]}\n---\n`);
	return { data: result.data ?? {}, yaml: match[1], bodyStart: match[0].length };
}

function isDate(value) {
	return value instanceof Date && !Number.isNaN(value.getTime());
}

function rawLooksQuoted(yaml, key) {
	const line = new RegExp(`(?:^|\\n)${key}:[ \\t]*(['"])`, "m").exec(yaml);
	return line !== null;
}

function splitRow(line) {
	return line
		.trim()
		.replace(/^\|/, "")
		.replace(/\|$/, "")
		.split("|")
		.map((cell) => cell.trim());
}

/**
 * Blank out fenced blocks and inline code spans while preserving every byte
 * offset, so offsets computed on the mask still map to real line numbers.
 */
function maskCode(body) {
	const lines = body.split(/\r?\n/);
	let depth = null;
	const masked = lines.map((line) => {
		const fence = /^\s*(`{3,}|~{3,})/.exec(line);
		if (fence) {
			if (depth === null) depth = fence[1][0];
			else if (fence[1][0] === depth) depth = null;
			return " ".repeat(line.length);
		}
		if (depth !== null) return " ".repeat(line.length);
		return line.replace(/(`+)[\s\S]*?\1/g, (span) => " ".repeat(span.length));
	});
	return masked.join("\n");
}

/* ------------------------------------------------------------------- checks */

function checkFrontmatter(ctx) {
	const { data, yaml, filePath } = ctx;
	const add = ctx.add;

	for (const [key, spec] of Object.entries(FIELDS)) {
		const present = Object.hasOwn(data, key);
		const value = data[key];

		if (!present || value === null || value === undefined) {
			if (spec.required) {
				add("error", "FM001", `frontmatter is missing required field \`${key}\``, key);
			} else if (spec.conventional && !present) {
				add(
					"info",
					"FM101",
					`\`${key}\` is not declared; the schema default (${JSON.stringify(spec.default)}) applies`,
					key,
				);
			}
			continue;
		}

		switch (spec.type) {
			case "string":
				if (typeof value !== "string") {
					add("error", "FM002", `\`${key}\` must be a string, got ${typeof value}`, key);
				} else if (spec.nonEmpty && value.trim() === "") {
					add("error", "FM003", `\`${key}\` must not be empty`, key);
				}
				break;
			case "stringOrNull":
				if (typeof value !== "string") {
					add("error", "FM002", `\`${key}\` must be a string or null, got ${typeof value}`, key);
				}
				break;
			case "stringArray":
				if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
					add("error", "FM004", `\`${key}\` must be a list of strings`, key);
				} else {
					const blank = value.filter((item) => item.trim() === "");
					if (blank.length > 0) add("warn", "FM104", `\`${key}\` contains ${blank.length} empty entr(ies)`, key);
					const normalized = value.map((item) => item.trim().toLowerCase());
					const dupes = [...new Set(normalized.filter((item, i) => normalized.indexOf(item) !== i))];
					if (dupes.length > 0) add("warn", "FM105", `\`${key}\` has duplicate entr(ies): ${dupes.join(", ")}`, key);
				}
				break;
			case "boolean":
				if (typeof value !== "boolean") {
					add("error", "FM005", `\`${key}\` must be a boolean (true/false), got ${JSON.stringify(value)}`, key);
				}
				break;
			case "number":
				if (typeof value !== "number" || Number.isNaN(value)) {
					add("error", "FM006", `\`${key}\` must be a number, got ${JSON.stringify(value)}`, key);
				}
				break;
			case "date":
				if (!isDate(value)) {
					add("error", "FM007", `\`${key}\` must be a YAML date (e.g. 2026-10-05), got ${JSON.stringify(value)}`, key);
				} else if (rawLooksQuoted(yaml, key)) {
					add("warn", "FM106", `\`${key}\` is quoted; write it unquoted so YAML parses it as a date`, key);
				}
				break;
		}
	}

	for (const key of Object.keys(data)) {
		if (!Object.hasOwn(FIELDS, key)) {
			add("warn", "FM107", `unknown frontmatter key \`${key}\`; the zod schema silently drops it`, key);
		}
	}

	if (isDate(data.published) && isDate(data.updated) && data.updated < data.published) {
		add("warn", "FM108", "`updated` is earlier than `published`", "updated");
	}

	// `slug` becomes Astro's entry.id and therefore the public URL.
	const declaredSlug = typeof data.slug === "string" ? data.slug.trim() : "";
	const derivedId = fileDerivedId(filePath);
	if (declaredSlug) {
		if (declaredSlug !== derivedId) {
			add(
				"warn",
				"FM109",
				`\`slug: ${declaredSlug}\` overrides the file-derived id \`${derivedId}\`, so the public URL becomes /posts/${declaredSlug}/ — changing or removing it breaks existing links`,
				"slug",
			);
		}
		if (!/^[a-z0-9]+(?:[./-][a-z0-9]+)*$/.test(declaredSlug)) {
			add("warn", "FM110", `\`slug\` should be lowercase kebab-case / path form: ${declaredSlug}`, "slug");
		}
	}

	if (typeof data.lang === "string" && data.lang.includes("-")) {
		add(
			"warn",
			"FM111",
			`\`lang: ${data.lang}\` uses a hyphen; the site default and i18n keys use \`zh_CN\` (underscore)`,
			"lang",
		);
	}

	if (typeof data.description === "string" && data.description.trim() === "") {
		add(
			"info",
			"FM102",
			"`description` is empty, so post cards fall back to the first body paragraph as the excerpt",
			"description",
		);
	}
	if (typeof data.description === "string" && data.description.trim().length > 160) {
		add("warn", "FM112", `\`description\` is ${data.description.trim().length} chars; long text is clamped on cards`, "description");
	}

	if (typeof data.image === "string" && data.image.trim() !== "") {
		const image = data.image.trim();
		const isRemote = /^(?:https?:)?\/\//i.test(image);
		const isPublic = image.startsWith("/");
		if (!isRemote && !isPublic && image !== "api") {
			const resolved = path.resolve(path.dirname(filePath), image);
			let exists = false;
			try {
				exists = statSync(resolved).isFile();
			} catch {
				exists = false;
			}
			if (!exists) {
				add("warn", "FM113", `\`image\` points at a missing file relative to the post: ${image}`, "image");
			}
		}
		if (isPublic) {
			let exists = false;
			try {
				exists = statSync(path.join(PUBLIC_DIR, image.replace(/^\//, ""))).isFile();
			} catch {
				exists = false;
			}
			if (!exists) add("warn", "FM114", `\`image\` points at a missing public asset: ${image}`, "image");
		}
	}

	if (typeof data.password === "string" && data.password.length > 0 && typeof data.passwordHint === "string" && data.passwordHint.trim() === "") {
		add("info", "FM115", "encrypted post has no `passwordHint`", "passwordHint");
	}
	if (typeof data.series === "string" && data.series.trim() !== "" && typeof data.seriesOrder !== "number") {
		add("info", "FM116", "`series` is set but `seriesOrder` is missing, so ordering falls back", "seriesOrder");
	}
}

function checkBody(ctx) {
	const { body, filePath } = ctx;
	const add = ctx.add;
	const lines = body.split(/\r?\n/);

	if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
	if (body.length > 0 && !body.endsWith("\n")) {
		add("warn", "BD101", "file does not end with a trailing newline", null, lines.length);
	}
	if (body.trim() === "") {
		add("error", "BD102", "body is empty", null, 1);
		return;
	}

	// fenced code blocks
	const fences = [];
	let open = null;
	for (let i = 0; i < lines.length; i++) {
		const match = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(lines[i]);
		if (!match) continue;
		const [, indent, marker, info] = match;
		if (open === null) {
			open = { line: i + 1, marker: marker[0], len: marker.length, info: info.trim() };
		} else if (marker[0] === open.marker && marker.length >= open.len) {
			fences.push({ ...open, end: i + 1 });
			open = null;
		}
	}
	if (open !== null) {
		add("error", "BD103", "unclosed code fence", null, open.line);
	}
	for (const fence of fences) {
		if (fence.info === "") {
			add("warn", "BD104", "code fence has no language tag", null, fence.line);
		}
	}

	const inFence = new Array(lines.length + 1).fill(false);
	let depth = null;
	for (let i = 0; i < lines.length; i++) {
		const match = /^\s*(`{3,}|~{3,})/.exec(lines[i]);
		if (match) {
			if (depth === null) depth = match[1][0];
			else if (match[1][0] === depth) depth = null;
			inFence[i + 1] = true;
			continue;
		}
		inFence[i + 1] = depth !== null;
	}

	// headings
	let previousLevel = 0;
	for (let i = 0; i < lines.length; i++) {
		if (inFence[i + 1]) continue;
		const match = /^(#{1,6})\s+(.*)$/.exec(lines[i]);
		if (!match) continue;
		const level = match[1].length;
		const text = match[2].trim();
		if (level === 1) {
			add("warn", "BD105", "`#` H1 in the body: the layout already renders the frontmatter `title` as the page H1", null, i + 1);
		}
		if (previousLevel !== 0 && level > previousLevel + 1) {
			add("warn", "BD106", `heading jumps from h${previousLevel} to h${level}`, null, i + 1);
		}
		if (text === "") add("error", "BD107", "empty heading", null, i + 1);
		if (/[。．.]$/.test(text) && level >= 2) {
			add("info", "BD108", "heading ends with a full stop; headings read better without one", null, i + 1);
		}
		if (i > 0 && lines[i - 1].trim() !== "" && !inFence[i]) {
			add("warn", "BD109", "heading is not preceded by a blank line", null, i + 1);
		}
		if (i < lines.length - 1 && lines[i + 1].trim() !== "" && !inFence[i + 2]) {
			add("warn", "BD110", "heading is not followed by a blank line", null, i + 1);
		}
		const anchor = text.replace(/\s+#+$/, "");
		if (anchor !== text) add("info", "BD111", "trailing `#` in heading text is redundant", null, i + 1);
		previousLevel = level;
	}

	// tables
	for (let i = 0; i < lines.length - 1; i++) {
		if (inFence[i + 1] || inFence[i + 2]) continue;
		if (!/^\s*\|.*\|\s*$/.test(lines[i])) continue;
		// A delimiter row must itself contain a pipe; a bare `---` is a thematic
		// break or a setext underline, never the separator of a multi-column table.
		if (!lines[i + 1].includes("|") || !/^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) || !lines[i + 1].includes("-")) continue;
		const header = splitRow(lines[i]);
		const separator = splitRow(lines[i + 1]);
		if (header.length !== separator.length) {
			add(
				"warn",
				"BD112",
				`table header has ${header.length} column(s) but the separator has ${separator.length}`,
				null,
				i + 1,
			);
		}
		const bodyStart = i + 2;
		for (let j = bodyStart; j < lines.length; j++) {
			if (!/^\s*\|/.test(lines[j]) || lines[j].trim() === "") break;
			const row = splitRow(lines[j]);
			if (row.length !== header.length && lines[j].trim() !== "") {
				add("warn", "BD113", `table row has ${row.length} cell(s), header has ${header.length}`, null, j + 1);
				break;
			}
		}
	}

	// `---` right under a text line silently becomes a setext H2.
	for (let i = 1; i < lines.length; i++) {
		if (inFence[i + 1]) continue;
		if (!/^\s*(?:-{2,}|={2,})\s*$/.test(lines[i])) continue;
		const previous = lines[i - 1];
		if (previous.trim() === "" || inFence[i]) continue;
		if (/^\s*(?:[>|#]|[-*+]\s|\d+\.\s|:::|`{3,}|~{3,})/.test(previous)) continue;
		add(
			"warn",
			"BD121",
			"`" + lines[i].trim() + "` directly under a text line becomes a setext heading; add a blank line before it",
			null,
			i + 1,
		);
	}

	// callouts
	for (let i = 0; i < lines.length; i++) {
		if (inFence[i + 1]) continue;
		const blockquote = /^\s*>\s*\[!([A-Za-z]+)\]\s*(.*)$/.exec(lines[i]);
		if (blockquote) {
			const type = blockquote[1].toLowerCase();
			if (!GITHUB_CALLOUTS.has(type) && !OTHER_CALLOUTS.has(type)) {
				add("warn", "BD114", `unknown callout type \`[!${blockquote[1]}] \``, null, i + 1);
			} else if (!GITHUB_CALLOUTS.has(type)) {
				add(
					"warn",
					"BD115",
					`\`[!${blockquote[1]}] \` is not one of the GitHub callout types this site themes (NOTE/TIP/IMPORTANT/WARNING/CAUTION)`,
					null,
					i + 1,
				);
			}
			continue;
		}
		const directive = /^\s*:::(note|tip|important|warning|caution|info|danger|example|quote|abstract|todo|success|question|failure|bug)\b/i.exec(lines[i]);
		if (directive) {
			add(
				"info",
				"BD116",
				`Docusaurus directive \`:::${directive[1]}\` renders like \`> [!${directive[1].toUpperCase()}]\` (remark-directive-rehype converts it), but \`:::\` blocks cannot nest inside a callout`,
				null,
				i + 1,
			);
		}
	}

	// excerpt quality: remark-excerpt takes the first paragraph
	let firstBlock = -1;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].trim() !== "" && !inFence[i + 1]) {
			firstBlock = i;
			break;
		}
	}
	if (firstBlock !== -1) {
		const line = lines[firstBlock];
		if (/^(?:[>|#]|[-*+]\s|\d+\.\s)/.test(line.trim())) {
			add("info", "BD117", "the first content block is not a plain paragraph; it becomes the card excerpt only when `description` is empty", null, firstBlock + 1);
		}
	}

	// misc authoring hygiene
	for (let i = 0; i < lines.length; i++) {
		if (inFence[i + 1]) continue;
		if (/\s+$/.test(lines[i]) && lines[i].trim() !== "") {
			const hardBreak = / {2,}$/.test(lines[i]);
			add(
				"info",
				"BD118",
				hardBreak
					? "trailing double space is a Markdown hard break; `<br>` or a list is less fragile"
					: "trailing whitespace",
				null,
				i + 1,
			);
		}
		if (/\t/.test(lines[i])) add("warn", "BD119", "tab inside body prose; the theme formats with tabs but Markdown lists may misindent", null, i + 1);
	}
}

function checkWikiLinks(ctx) {
	const { body, slugIndex } = ctx;
	const add = ctx.add;
	const masked = maskCode(body);

	const seen = /!?\[\[([^[\]\n]+)\]\]/g;
	let match;
	while ((match = seen.exec(masked)) !== null) {
		if (match[0].startsWith("!")) continue;
		// `[[text]](url)` is a Markdown link whose label merely looks like a wiki
		// link; remark-wiki-link never rewrites text inside a link node.
		if (masked[match.index + match[0].length] === "(") continue;
		const line = masked.slice(0, match.index).split(/\r?\n/).length;
		const target = match[1].split("|")[0].split("#")[0].trim();
		if (target === "") continue;
		const normalized = target.replace(/^\.?\//, "").replace(MARKDOWN_EXT, "").replace(/^posts\//, "");
		const key = normalized.toLowerCase();
		const resolved =
			slugIndex.slugs.has(key) ||
			slugIndex.paths.has(key) ||
			(slugIndex.basenames.get(path.posix.basename(key)) ?? 0) === 1;
		if (!resolved) {
			add("warn", "BD120", `wiki link \`[[${match[1]}]]\` does not resolve to any post`, null, line);
		}
	}
}

/* -------------------------------------------------------------------- runner */

function createReport(filePath) {
	const problems = [];
	// Closed over rather than read from `this`, because callers detach `add`.
	const state = { lineOffset: 0 };
	return {
		filePath,
		/** Body-relative line numbers are shifted by this much when reported. */
		set lineOffset(value) {
			state.lineOffset = value;
		},
		get lineOffset() {
			return state.lineOffset;
		},
		problems,
		add(severity, code, message, field = null, line = null) {
			problems.push({
				severity,
				code,
				message,
				field,
				line: line === null ? null : line + state.lineOffset,
			});
		},
	};
}

/**
 * Mirrors remark-wiki-link's resolution order: frontmatter `slug`, then exact
 * content path, then a bare file name accepted only when it is unique.
 */
function buildPostIndex() {
	const slugs = new Set();
	const paths = new Set();
	const basenames = new Map();
	let files = [];
	try {
		files = collectMarkdownFiles(POSTS_DIR);
	} catch {
		return { slugs, paths, basenames };
	}
	const addBasename = (name) => {
		const key = name.toLowerCase();
		basenames.set(key, (basenames.get(key) ?? 0) + 1);
	};
	for (const file of files) {
		const contentPath = path
			.relative(POSTS_DIR, file)
			.replaceAll("\\", "/")
			.replace(MARKDOWN_EXT, "");
		const derivedId = fileDerivedId(file);
		paths.add(contentPath.toLowerCase());
		paths.add(derivedId.toLowerCase());
		addBasename(path.posix.basename(contentPath));
		if (derivedId !== contentPath) addBasename(path.posix.basename(derivedId));

		let declared = "";
		try {
			const parsed = parseFrontmatter(readFileSync(file, "utf8"));
			declared = typeof parsed?.data.slug === "string" ? parsed.data.slug.trim() : "";
		} catch {
			/* unreadable file: fall back to the derived id only */
		}
		slugs.add((declared || derivedId).toLowerCase());
		if (declared) {
			paths.add(declared.toLowerCase());
			addBasename(path.posix.basename(declared));
		}
	}
	return { slugs, paths, basenames };
}

function validateFile(filePath, slugIndex) {
	const raw = readFileSync(filePath, "utf8");
	const report = createReport(filePath);
	const parsed = parseFrontmatter(raw);

	if (!parsed) {
		report.add("error", "FM000", "file has no YAML frontmatter block starting at line 1");
		return report;
	}
	const body = raw.slice(parsed.bodyStart);
	const lineOffset = raw.slice(0, parsed.bodyStart).split(/\r?\n/).length - 1;
	report.lineOffset = lineOffset;
	const ctx = { ...report, data: parsed.data, yaml: parsed.yaml, body, filePath, slugIndex };

	checkFrontmatter(ctx);
	checkBody(ctx);
	checkWikiLinks(ctx);
	report.problems.sort((a, b) => (a.line ?? 0) - (b.line ?? 0) || a.code.localeCompare(b.code));
	return report;
}

function relative(filePath) {
	const rel = path.relative(process.cwd(), filePath);
	return rel.startsWith("..") ? filePath : rel;
}

function main() {
	const slugIndex = buildPostIndex();
	let files;
	try {
		files = targets.flatMap((target) => collectMarkdownFiles(target));
	} catch (error) {
		console.error(`validate-post: ${error.message}`);
		process.exit(2);
	}

	if (files.length === 0) {
		console.error("validate-post: no Markdown files matched");
		process.exit(2);
	}

	const reports = files.map((file) => validateFile(file, slugIndex));
	const errors = reports.flatMap((r) => r.problems.filter((p) => p.severity === "error"));
	const warnings = reports.flatMap((r) => r.problems.filter((p) => p.severity === "warn"));
	const infos = reports.flatMap((r) => r.problems.filter((p) => p.severity === "info"));

	if (options.json) {
		console.log(JSON.stringify({ files: reports.length, errors: errors.length, warnings: warnings.length, infos: infos.length, reports }, null, 2));
	} else {
		const badge = { error: "ERROR", warn: "WARN ", info: "info " };
		for (const report of reports) {
			const shown = options.quiet ? report.problems.filter((p) => p.severity !== "info") : report.problems;
			if (shown.length === 0) {
				if (!options.quiet) console.log(`\nOK    ${relative(report.filePath)}`);
				continue;
			}
			console.log(`\n${relative(report.filePath)}`);
			for (const problem of shown) {
				const where = problem.line ? `:${problem.line}` : problem.field ? ` (${problem.field})` : "";
				console.log(`  ${badge[problem.severity]} ${problem.code}${where}  ${problem.message}`);
			}
		}
		console.log(
			`\n${files.length} file(s): ${errors.length} error(s), ${warnings.length} warning(s), ${infos.length} info`,
		);
	}

	const overWarningBudget = warnings.length > options.maxWarnings;
	process.exit(errors.length > 0 || overWarningBudget ? 1 : 0);
}

main();
