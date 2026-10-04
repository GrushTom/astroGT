# Frontmatter reference

Contract: `postsCollection` in `src/content.config.ts` (zod schema, glob loader over
`src/content/posts/**/*.{md,mdx}`). Anything not listed there is **not** in `entry.data`.

## Field table

| Field | Type | Required | Default | What actually happens |
|---|---|---|---|---|
| `title` | string | **yes** | — | Page `<h1>`, card title, `<title>`, OG title. Must be non-empty. |
| `published` | date | **yes** | — | Unquoted YAML date. Drives post ordering and `datePublished`. |
| `updated` | date | no | — | Sets `dateModified` and the “last edited” card (`siteConfig.post.showLastModified`, `siteConfig.ts:239`). |
| `draft` | boolean | no | `false` | `true` keeps the post out of listings. Never flip this as a formatting change. |
| `description` | string | no | `""` | Post-card body text **and** first fallback for SEO description. Falls back to the first body paragraph when empty. |
| `image` | string | no | `""` | Cover. `""` = none · `/…` = file under `public/` · `https://…` or `//…` = remote · otherwise a path relative to the post file (goes through Astro's image pipeline) · `api` = random-cover API, **currently a no-op** (see below). |
| `tags` | string[] | no | `[]` | Rendered as tag chips; also feeds related posts. |
| `category` | string \| null | no | `""` | Free-form. A new value simply adds a new category. |
| `lang` | string | no | `""` | Empty → `siteConfig.lang` (`zh_CN`). Used for `<html lang>`, OG locale and `inLanguage`. |
| `pinned` | boolean | no | `false` | Pins to the top of listings. |
| `author` | string | no | `""` | Falls back to `profileConfig.name` (`[...slug].astro:226,475`). |
| `sourceLink` | string | no | `""` | **Repost** canonical URL. Becomes the licence block's permalink (`License.astro:25`). Do not set it on an original article that merely cites sources. |
| `licenseName` | string | no | `""` | Licence shown in the licence block; also picks the licence icon. |
| `licenseUrl` | string | no | `""` | Licence link. |
| `comment` | boolean | no | `true` | Per-post comment switch. |
| `password` | string | no | `""` | Non-empty encrypts the post; the card shows a lock icon. |
| `passwordHint` | string | no | `""` | Hint shown on the encrypted post's unlock form. |
| `series` | string | no | `""` | Groups posts into a series (`src/utils/content-utils.ts:117`). |
| `seriesOrder` | number | no | — | Order within the series. Set it whenever `series` is set. |
| `slug` | string | *not in schema* | — | **Read by Astro's glob loader as `entry.id` → decides the URL.** See below. |
| `prevTitle` `prevSlug` `nextTitle` `nextSlug` | string | no | `""` | Internal; normalise to `""`. Do not hand-write navigation. |

## Traps

### `slug` is invisible to `entry.data` but decides the URL

It is absent from the zod schema, so `z.object` strips it and it never appears on
`entry.data`. It is still honoured because the glob loader reads **raw** frontmatter before
schema validation:

```
node_modules/astro/dist/content/loaders/glob.js
  function generateIdDefault({ entry, base, data }, isLegacy) {
    if (data.slug) { return String(data.slug); }
```

`entry.id` → `getPostUrlBySlug()` (`src/utils/url-utils.ts`) → `/posts/<id>/`, and the OG
image route keys off the same id (`src/pages/og/[...slug].ts`). The theme's wiki-link plugin
documents this in `toPostId()` (`src/plugins/remark-wiki-link.js`).

- `slug` equal to the file-derived id → no-op, safe.
- `slug` different from the file path → a deliberate URL override. Keep it; changing or
  removing it changes the public URL and breaks existing links.
- `slug` is used **verbatim** — it is *not* lowercased or slugified. `slug: MySlug` yields
  `/posts/MySlug/`. (Path-derived ids *are* slugified per segment by `github-slugger`, so
  `My Post.md` becomes `my-post`.) `src/content/posts/guide/index.md` claims slugs are
  lowercased automatically — that page is wrong.
- `slug: ""` is falsy, so it falls back to the file-derived id.
- Two posts resolving to the same id produce Astro's duplicate-id warning.
- `scripts/new-post.js` writes a `slug` for every scaffolded post, so its presence is normal.

### `image: api` is currently inert

`image-utils.ts:47-53` returns `""` unless `coverImageConfig.randomCoverImage.enable` is
`true`, and `src/config/coverImageConfig.ts:32` sets it to **`false`**. So today `image: api`
produces **no cover at all** — do not "fix" a visible cover by switching to `api`, and do not
report a missing cover as a formatting bug. Changing the config is a site-owner decision.

### `lang` vs the Front Matter CMS field named `language`

`_frontmatter.json` (Front Matter CMS config) declares a field whose **name is `language`**,
but the schema only knows `lang`. Editing the language through that CMS UI writes a
`language:` key, which the schema silently drops. If a post has `language:` and no `lang:`,
that is the cause — rename the key.

### `lang` value format

Prefer `zh_CN` (underscore): it matches `siteConfig.lang === resolveSiteLang("zh_CN")`
(`src/config/siteConfig.ts:7`) and the i18n module keys in `src/i18n/languages/`
(`zh_CN.ts`, `zh_TW.ts`). `zh-CN` still normalises fine for `<html lang>` and OG locale
(both do `replace("_", "-")` / `split`), but `getOgLocale()` silently returns `en_US` for
any value it does not recognise — so a typo fails quietly.

### Dates must stay unquoted

`published: 2026-10-05` → YAML date → satisfies `z.date()`.
`published: "2026-10-05"` → string → **schema failure**, which fails the whole content
collection, not just this post. Timestamps are also valid:
`published: 2024-01-11T04:40:26.381Z`.

### `description` beats the excerpt, and the excerpt is the first paragraph

`PostCard.astro:99`: `const descriptionText = description || remarkPluginFrontmatter.excerpt || ""`,
where the excerpt is the document's first paragraph (`src/plugins/remark-excerpt.js`). So:

- With a non-empty `description`, the card is fine whatever the body starts with.
- With an empty `description`, a body that opens with a metadata line, a blockquote, a list
  or a table produces a useless card excerpt. Open with a real prose paragraph.

### Unknown keys disappear silently

`z.object` strips unknown keys, so a typo (`descriptions:`, `tag:`) yields no error and no
effect. Verified by `validate-post.mjs` code `FM107`.

## Minimal valid frontmatter

```yaml
---
title: "文章标题"
published: 2026-10-05
description: "一到两句摘要，显示在文章卡片上。"
image: ""
tags:
  - 教程
category: 技术教程
draft: false
lang: zh_CN
---
```

## Enhanced frontmatter (repost or series)

```yaml
---
title: "文章标题"
published: 2026-10-05
updated: 2026-10-12
description: "摘要。"
image: ./cover.png        # file next to the post → Astro image pipeline
tags: [教程, API]
category: 技术教程
draft: false
lang: zh_CN
pinned: false
author: "作者名"
series: "系列名"
seriesOrder: 2
comment: true
licenseName: "CC BY-NC-SA 4.0"
licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
# sourceLink 仅用于转载原文；原创文章引用来源请写正文的「参考资料」小节
---
```

## Scaffolding

`pnpm new-post <filename>` writes a scaffold with `title`, `published`, `description`,
`image`, `tags`, `category`, `draft`, `lang`, `slug`. It does **not** create a valid
`description`; fill it in.
