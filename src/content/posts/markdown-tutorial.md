---
title: Markdown 写作指南：基础语法与 Firefly 扩展
published: 2026-10-13
description: 从基础语法到代码、公式、图表和 MDX 的分章写作指南，通过所属系列切换章节。
image: ''
tags:
- 文章示例
category: 文章示例
draft: false
lang: zh-CN
pinned: false
licenseName: 未授权
author: emn178
sourceLink: https://github.com/emn178/markdown
series: Markdown 写作指南
seriesOrder: 0
---

本系列从日常写作出发，先学习通用 Markdown，再了解 Firefly 的代码高亮、公式、图表和组件扩展。使用页面中的 **“所属系列”** 切换章节；文章列表只保留这个入口。

## 如何阅读

| 阶段 | 章节 | 解决的问题 |
| --- | --- | --- |
| 基础写作 | 基础语法、结构排版、链接与图片 | 组织文字、层级和参考资料 |
| 常用扩展 | 表格与任务列表、代码高亮 | 写清步骤、对比和技术示例 |
| Firefly 功能 | 提示框、公式、Mermaid、PlantUML | 补充提示与可视化表达 |
| 内容进阶 | 视频、Wiki 链接、MDX | 嵌入媒体、关联文章、使用组件 |

## 五分钟开始写作

在 `.md` 文件顶部填写文章元数据，正文与元数据之间用 `---` 分隔。页面会显示 `title`，正文通常从二级标题开始，避免重复文章标题。

```markdown
---
title: 我的第一篇笔记
published: 2026-10-13
description: 记录一次学习过程。
tags: [学习笔记]
category: 学习记录
draft: false
lang: zh-CN
---

## 今天学到了什么

这是一个段落，**粗体**用来突出结论。

- 第一个要点
- 第二个要点

[查看参考资料](https://markdown.com.cn/basic-syntax/)
```

## 分清语法与站点功能

标题、段落、强调、引用、列表、链接、图片、代码和转义属于基础写法。表格、任务列表、删除线是常见扩展；公式、图表、提示框与仓库卡片还依赖站点插件。将文章复制到其他编辑器时，这些扩展的效果可能不同。

原有基础教程参考 emn178/markdown；本次在保留出处信息的基础上重写为分章指南。

本系列的基础分类参考 [Markdown 官方教程中文站的基础语法目录](https://markdown.com.cn/basic-syntax/)，讲解与示例按本项目重新整理。进阶章节保留现有示例，便于对照实际渲染效果。

## 系列文章如何发布

同一套教程的各章填写相同的 `series`，用 `seriesOrder` 指定阅读顺序。编号最小的公开章节作为列表入口，建议用 `0` 表示总览，后续章节从 `1` 开始。文件夹位置不决定章节顺序。

```yaml
series: 我的教程
seriesOrder: 0
```

只有设置 `draft: false` 的章节才会进入生产站点。每章仍保留独立地址，读者可以通过“所属系列”直接访问。
