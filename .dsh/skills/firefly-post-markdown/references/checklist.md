# Validator codes and triage rules

Run:

```powershell
node .dsh/skills/firefly-post-markdown/scripts/validate-post.mjs <file-or-dir> [--json] [--quiet] [--max-warnings N]
```

- Read-only. It never rewrites files.
- Exit `0` = no errors; `1` = errors (or warnings over `--max-warnings`); `2` = usage/IO failure.
- With no path argument it validates all of `src/content/posts`.
- Line numbers are absolute file lines.

## Triage rules

| Severity | Meaning | Your obligation |
|---|---|---|
| `error` | Would break the build or the rendered document | **Fix it.** If you think it is intentional, prove it and say so. |
| `warn` | Real defect or strong convention break | Fix, or justify leaving it in the report. |
| `info` | Informational; often intentional | Mention only if it matters for the request. |

Never silence a warning by deleting content. Add the missing blank line, tag the fence,
close the fence — do not cut the text.

## Frontmatter codes

| Code | Sev | Trigger | Resolution |
|---|---|---|---|
| `FM000` | error | No `---` frontmatter block at line 1 | Add a valid frontmatter block. |
| `FM001` | error | `title` or `published` missing | Add it. `published` must be a real date, never invented. |
| `FM002` | error | Field has the wrong type | Match the schema in `src/content.config.ts`. |
| `FM003` | error | `title` is empty/whitespace | Write a title. |
| `FM004` | error | `tags` is not a list of strings | Use a YAML list (`- item`) or `[a, b]`. |
| `FM005` | error | Boolean field is not `true`/`false` | YAML `yes/no/on/off` become booleans too, but write `true`/`false`. |
| `FM006` | error | `seriesOrder` is not a number | Use a bare number. |
| `FM007` | error | Date field did not parse as a date | Unquote it: `published: 2026-10-05`. |
| `FM101` | info | Conventional field (`draft`, `pinned`, `comment`) not declared | Schema default applies. Declaring `draft`/`pinned` explicitly matches the scaffold. |
| `FM102` | info | `description` empty | Card falls back to the first body paragraph — make sure that paragraph is prose. |
| `FM104` | warn | Empty string in `tags` | Remove it. |
| `FM105` | warn | Duplicate tags (case-insensitive) | De-duplicate. |
| `FM106` | warn | Date field is quoted | Unquote so YAML yields a date. |
| `FM107` | warn | Unknown key — the zod schema silently drops it | Fix the typo, or remove. Note: `slug` is *known* to the loader, so it is exempt. |
| `FM108` | warn | `updated` earlier than `published` | Fix one of them (ask the author which is right). |
| `FM109` | warn | `slug` differs from the file-derived id → it overrides the URL | **Do not "fix" by changing it.** Keep, and flag the URL in your report. |
| `FM110` | warn | `slug` not lowercase kebab/path form | Slugs should be `[a-z0-9]` with `-`, `.` or `/` separators. |
| `FM111` | warn | `lang` uses a hyphen (`zh-CN`) | Prefer `zh_CN` (underscore). |
| `FM112` | warn | `description` longer than 160 characters | Cards clamp it; shorten if the author agrees. |
| `FM113` | warn | `image` relative path does not exist next to the post | Fix the path or drop `image`. |
| `FM114` | warn | `image: /…` does not exist under `public/` | Fix the path. |
| `FM115` | info | Encrypted post with no `passwordHint` | Consider adding a hint. |
| `FM116` | info | `series` set but `seriesOrder` missing | Add the order. |

## Body codes

| Code | Sev | Trigger | Resolution |
|---|---|---|---|
| `BD101` | warn | File has no trailing newline | Add one. |
| `BD102` | error | Body is empty | Write content, or `draft: true`. |
| `BD103` | error | Unclosed code fence | Close it. **This silently swallows the rest of the document.** |
| `BD104` | warn | Fence has no language tag | Add one (`text` for bare URLs/transcripts). |
| `BD105` | warn | `#` H1 in the body | Demote to `##` — the layout already renders the title as the H1. |
| `BD106` | warn | Heading level skipped (`##` → `####`) | Insert the intermediate level or re-level. |
| `BD107` | error | Empty heading | Remove or fill it. |
| `BD108` | info | Heading ends with a full stop | Headings read better without one. Only change if the user wants copy edits. |
| `BD109` | warn | No blank line before a heading | Add one. |
| `BD110` | warn | No blank line after a heading | Add one. |
| `BD111` | info | Trailing `#` in heading text | Redundant; remove. |
| `BD112` | warn | Table header and delimiter row column counts differ | Make them match. |
| `BD113` | warn | Table row cell count differs from the header | Fix the row. |
| `BD114` | warn | Unknown callout type | Use one of the recognised types. |
| `BD115` | warn | Callout type not themed here (theme is `github`) | Use `NOTE`/`TIP`/`IMPORTANT`/`WARNING`/`CAUTION`, or leave it if the author wants that specific type. |
| `BD116` | info | Docusaurus `:::type` directive used | Equivalent to `> [!TYPE]` (`remark-directive-rehype` converts it). Informational only — but `:::` blocks cannot nest inside a callout. |
| `BD117` | info | First content block is not a plain paragraph | Only matters when `description` is empty (card excerpt). |
| `BD118` | info | Trailing whitespace / hard-break double space | Replace a hard break with `<br>` or restructure; strip other trailing whitespace. |
| `BD119` | warn | Tab used for prose indentation | Use spaces inside Markdown lists; the theme formats with tabs but list indentation is space-based. |
| `BD120` | warn | Wiki link target resolves to no post | Fix the target, or use a normal link if it points outside the blog. |
| `BD121` | warn | `---`/`===` directly under a text line → setext heading | Add a blank line before it. |

## What the validator deliberately does not check

- **Rendering.** It does not run Astro, so it cannot catch a plugin-level failure. `pnpm check`
  is the real gate.
- **Prose quality, tone, translation, factual accuracy.** Out of scope by design.
- **Whether a callout/syntax upgrade improves the article.** A judgement call for the author.
- **Content inside fenced code.** Blanked before scanning, on purpose — code samples are not
  documentation to be reformatted.
- **`src/content/spec`, `dynamic`, `projects`.** Different schemas; run the validator on a
  path under `src/content/posts` only.

## Baseline

`src/content/posts` is not warning-free. As of the skill's authoring, a full run reports
`0` errors except `draft.md` (a deliberate unclosed-fence demo) plus ~300 warnings, almost all
`BD109`/`BD110` in the two large imported posts (`potpvp-directory.md`,
`markdown-tutorial.md`). **Judge a file against its own baseline**, and do not mass-reformat
unrelated posts to make the aggregate number look better.
