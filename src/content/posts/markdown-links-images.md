---
title: 链接、图片、转义与 HTML
published: 2026-10-13
description: 链接和图片都使用方括号描述内容，再用圆括号填写地址。描述应让读者在打开之前知道目标是什么。
image: ''
tags:
- Markdown
- Firefly
category: 文章示例
draft: false
lang: zh-CN
series: Markdown 写作指南
seriesOrder: 3
---

链接和图片都使用方括号描述内容，再用圆括号填写地址。描述应让读者在打开之前知道目标是什么。

## 普通链接与参考式链接

```markdown
[Markdown 基础语法](https://markdown.com.cn/basic-syntax/)
[阅读基础教程][basic]

[basic]: https://markdown.com.cn/basic-syntax/ "基础语法目录"
```

参考式链接将地址集中到文末，适合同一链接多次出现的长文。还可以用 `<https://markdown.com.cn/>` 显示可点击的网址。

链接站内文章时使用实际生成的 `/posts/文章标识/` 地址；章节标题的锚点应从预览页面复制，不要猜测中文标题转换后的结果。

## 图片

```markdown
![主题预览](./images/firefly3.webp "Firefly 主题")
```

`!` 是图片与普通链接的区别。替代文字应描述图片内容；括号里的可选标题不能代替它。相对路径以当前文章文件位置为基准，移动文章时需要同步检查图片路径。

![Firefly 主题预览](./images/firefly3.webp)

给图片加链接时，将完整图片语法放在链接文字的位置：

```markdown
[![主题预览](./images/firefly3.webp)](https://github.com/CuteLeaf/Firefly)
```

## 转义特殊符号

不想让星号、方括号等触发语法时，在前面加反斜杠。介绍语法本身时，行内代码通常更易读。

```markdown
\*这里显示星号，不会变成斜体\*
\# 这不是标题
```

## 内嵌 HTML

普通 Markdown 不便表达折叠区域等结构时，可以使用 HTML。不同渲染器对 HTML 内部 Markdown 的处理不同，复杂内容应先预览。

```html
<details>
  <summary>查看补充说明</summary>
  <p>这里使用 HTML 段落，保持结构清晰。</p>
</details>
```

<details>
  <summary>查看补充说明</summary>
  <p>这里使用 HTML 段落，保持结构清晰。</p>
</details>

MDX 将这些标签按 JSX 处理，属性和闭合规则请看本系列的 MDX 章节。
