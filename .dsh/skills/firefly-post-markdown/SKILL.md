---
name: firefly-post-markdown
description: "Audit, repair and enhance Firefly blog post Markdown under src/content/posts. Validates frontmatter against the content-collection contract, fixes YAML and structural defects, and applies the theme's extended syntax (GitHub callouts, tabbed code groups, Mermaid, PlantUML, KaTeX, wiki-link cards, image grids, GitHub cards) without changing what the author wrote. Use when reviewing, importing, reformatting or optimising any post .md/.mdx."
whenToUse: "A post under src/content/posts/ needs its frontmatter corrected, or its body formatting audited, repaired or upgraded to the theme's richer syntax. Also use before publishing an imported/uploaded article."
---

# Firefly post Markdown: audit, repair, enhance

This project is **Firefly** (Astro + Svelte). Posts live in `src/content/posts/**/*.{md,mdx}`.
Their frontmatter contract is `src/content.config.ts`; their rendering pipeline is the
`markdown` block of `astro.config.mjs` plus `src/plugins/*`.

Run every command in this skill **from the project root** (`git rev-parse --show-toplevel`).

## Non-negotiables

1. **Never change meaning.** Formatting, structure and syntax only. Do not reword, shorten,
   re-order, or "improve" the author's prose unless explicitly asked to edit content.
2. **Never invent facts.** Do not add dates, author names, licences, links, tags or claims
   that are not already present or explicitly given. `published` is a real publication date —
   if it is missing, ask rather than guess.
3. **Never rename or retarget `slug`, and never rename the file**, unless the user asks to
   change the URL. Both silently change the public URL and break every existing link
   (see “`slug` decides the URL” below).
4. **Never flip `draft`.** A draft is intentional. Do not publish it by setting `draft: false`.
5. **Touch one post per request** unless the user asks for a batch. A batch is one file per
   edit; never rewrite a file you have not read in full in this session.
6. **Do not delete content to make a validator quiet.** A warning is a prompt to look, not an
   instruction to cut text. If a finding is intentional (e.g. `---` as a thematic break),
   leave it and say so in your report.
7. **Do not run `pnpm build` for a formatting-only change** unless asked — it is slow
   (LQIPs, font subsetting, Pagefind). `pnpm check` is the proportionate gate.
8. **Never introduce raw HTML from an untrusted source.** The pipeline runs with
   `allowDangerousHtml: true` and **no sanitizer**, so raw HTML in a post is executed as-is.
   If you are converting an imported article, strip or escape embedded `<script>`, inline
   event handlers and unexpected `<iframe>`s rather than passing them through.

## `slug` decides the URL — the one fact that surprises everyone

`slug` is **not** in the zod schema in `src/content.config.ts`, so it never appears on
`entry.data`. It is therefore easy to conclude it is dead. It is not.

Astro's glob loader reads the **raw** frontmatter before schema validation and uses `slug`
verbatim as `entry.id`:

```
node_modules/astro/dist/content/loaders/glob.js
  function generateIdDefault({ entry, base, data }, isLegacy) {
    if (data.slug) { return String(data.slug); }
    ...
```

`entry.id` is the single source of the post URL (`src/utils/url-utils.ts` → `/posts/<id>/`).
The theme's own wiki-link plugin relies on this too — see the comment at the top of
`toPostId()` in `src/plugins/remark-wiki-link.js`.

Consequences to act on:

- `slug: random-mage-api-guide` on `random-mage-api-guide.md` is a **no-op**: the value equals
  the file-derived id, so the URL is unchanged either way. Safe.
- `slug` that **differs** from the file path is a deliberate URL override. Keep it exactly as
  found, and flag it in your report: the URL is `/posts/<slug>/`, not the file path.
- Deleting `slug`, or "fixing" it to match the filename, **changes the URL**. Never do this
  as a formatting cleanup.
- `slug` is used **verbatim** — not lowercased, not slugified. Path-derived ids *are*
  slugified per segment, so `My Post.md` → `my-post`, but `slug: MySlug` → `/posts/MySlug/`.
- `scripts/new-post.js` emits a `slug` for every new post, so its presence is the scaffolded
  norm, not a mistake.
- `slug: ""` falls back to the file-derived id.

Related trap: `image: api` is currently a **no-op** (`coverImageConfig.randomCoverImage.enable`
is `false`), so it yields no cover. Do not report a missing cover as a formatting bug, and do
not fix one by switching to `api`. Details in
[references/frontmatter.md](references/frontmatter.md).

## Workflow

### 1. Identify and read the target

```powershell
git status --short                      # an uploaded/untracked post shows up as ??
```

Read the whole file with the read tool before changing anything. You need its full structure
to judge heading levels, table widths and code-fence pairing.

### 2. Validate

```powershell
node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs <path-to-post>
node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs src/content/posts --quiet
node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs <path> --json
```

The script is read-only and exits `1` on errors. Its codes are documented in
[references/checklist.md](references/checklist.md). Triage each finding as
**fix / intentional / out-of-scope** — see that file for the triage rules.

### 3. Fix in this order

Work frontmatter → structure → syntax → polish. Frontmatter first, because a schema-invalid
value fails the whole content collection and hides every later problem.

1. **Frontmatter** — required fields, types, dates. See
   [references/frontmatter.md](references/frontmatter.md).
2. **Structure** — heading hierarchy, blank lines around headings, balanced fences,
   table column counts, setext-heading footguns.
3. **Syntax upgrade** (only if it genuinely helps the reader, and only when asked to
   "optimise"/"optimize"/"improve") — promote plain citations into callouts, build code
   groups, add figure captions, convert internal links to wiki-link cards. See
   [references/syntax.md](references/syntax.md). **Never upgrade everything at once**; pick
   the few places where the richer syntax actually carries meaning.
4. **Polish** — trailing whitespace, missing final newline, fence language tags.

### 4. Verify

```powershell
node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs <path>   # expect 0 errors
pnpm check                                                               # astro check
```

`pnpm check` is the real gate: it runs the content-collection schema, so an invalid
frontmatter value surfaces there and nowhere else. Use `pnpm type-check` only if you touched
TypeScript. `pnpm format` / `pnpm lint` target `./src` and `./scripts` and **do not format
Markdown**, so they are not a substitute for either command above.

If you changed only Markdown body text, you still owe the user at least `pnpm check`.

**Judge a file against its own baseline.** A directory-wide run is *not* clean out of the box:
`src/content/posts/draft.md` has a deliberately unclosed fence and the two large imported
posts carry hundreds of `BD109`/`BD110` heading-spacing warnings. Do not mass-reformat
unrelated posts to make the aggregate number look better.

### 5. Report

State, per file: what you changed, why, and what you deliberately left alone. Distinguish
*fixes* (schema/structure defects) from *enhancements* (syntax upgrades) — the user must be
able to accept one and revert the other.

## Frontmatter essentials

Required: `title` (non-empty string), `published` (unquoted YAML date).
Everything else is optional with a schema default. The full table, including the fields that
are conventional, the ones that are internal, and the two that are invisible to
`entry.data`, is in [references/frontmatter.md](references/frontmatter.md).

High-value rules:

- Write dates unquoted: `published: 2026-10-05`. Quoting yields a string and fails the
  `z.date()` schema.
- Prefer `lang: zh_CN` (underscore). `zh-CN` also normalises correctly for `<html lang>`
  (`src/layouts/Layout.astro`), but the site default and the i18n keys in
  `src/i18n/languages/` use underscores, and `getOgLocale()` silently falls back to `en_US`
  for anything it does not recognise.
- `category` is a free-form string: a new category simply appears in the category list.
  Do not invent a category to match an existing one.
- `description` is what the post card shows. When it is empty, `remark-excerpt` falls back
  to the **first paragraph of the body** (`src/plugins/remark-excerpt.js`,
  `src/components/layout/PostCard.astro`). So if `description` is empty, the first body
  paragraph must be real prose — not a metadata line, blockquote or list.
- `sourceLink` is for **reposts**: it is rendered as the licence block's permalink
  (`src/components/misc/License.astro` → `postUrl = sourceLink || ...`). An original article
  that merely cites sources must **not** set `sourceLink`; cite them in a `## 参考资料`
  section instead.

## Body rules

- **No `#` H1.** The layout renders the frontmatter `title` as the page H1; a body H1
  duplicates it and breaks the table of contents. Start at `##`.
- **Heading levels must not skip** (`##` → `###`, never `##` → `####`).
- **Blank lines around headings, tables, fences and lists.** Without them, `---` under a text
  line becomes a setext H2 and a fence can swallow the rest of the document.
- **Always tag code fences.** An untagged fence gets no language badge and no highlighting.
  Use the fence for what it contains: `text` for bare URLs/shell transcripts, plus `bash`,
  `python`, `json`, `html`, `yaml`, `typescript`, `markdown`, `mermaid`, `plantuml`.
- **Tables need a pipe in the delimiter row.** `| --- | --- |`, never a bare `---`.
- **Internal links**: prefer `[[post-id]]` (renders a card when alone on a line, a normal link
  inline) over hand-written `/posts/...` URLs. See [references/syntax.md](references/syntax.md).
- Numbered headings (`## 1. …`) are fine and common in imported tutorials. **If you renumber,
  renumber all of them**, and remember the TOC shows the numbers.
- A numbered section followed by an unnumbered one (`## 13. …` then `## 参考资料`) is a real
  inconsistency — either number everything or nothing.

## Verification checklist before you answer

- [ ] `validate-post.mjs` reports **0 errors** for the touched file.
- [ ] `pnpm check` passes.
- [ ] `git diff --stat` touches **only** the intended post file(s).
- [ ] No `slug`, filename, `draft` or `published` value changed.
- [ ] Every body edit is formatting/structure/syntax only — no prose rewritten.
- [ ] The report separates fixes from enhancements and lists what you left alone.

## Files in this skill

| File | Use it for |
|---|---|
| [references/frontmatter.md](references/frontmatter.md) | Every frontmatter field, its type, default, and the traps |
| [references/syntax.md](references/syntax.md) | Copy-pasteable extended syntax, with the theme config that gates it |
| [references/checklist.md](references/checklist.md) | Validator code reference + triage rules for every finding |
| `scripts/validate-post.mjs` | Read-only validator; `--json`, `--quiet`, `--max-warnings N` |
