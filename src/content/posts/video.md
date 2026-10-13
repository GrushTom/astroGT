---
title: 多媒体：嵌入视频
published: 1970-01-01
description: 这篇文章演示如何在博客文章中嵌入视频。
image: ''
tags:
- 示例
- 视频
- Firefly
category: 文章示例
draft: false
lang: zh-CN
series: Markdown 写作指南
seriesOrder: 10
---

视频使用平台提供的嵌入地址，放在 Markdown 正文中，不要放进顶部 YAML 元数据。普通的视频观看页面地址不一定可以直接嵌入。

## 基本写法

```html
<iframe
  src="https://www.youtube.com/embed/5gIf0_xpFPI"
  title="YouTube 示例视频"
  width="100%"
  height="468"
  loading="lazy"
  allowfullscreen>
</iframe>
```

## YouTube 示例

<iframe width="100%" height="468" src="https://www.youtube.com/embed/5gIf0_xpFPI" title="YouTube 示例视频" loading="lazy" allowfullscreen></iframe>

## Bilibili 示例

```html
<iframe src="https://player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1&autoplay=0" title="Bilibili 示例视频" width="100%" height="468" loading="lazy" allowfullscreen></iframe>
```

<iframe src="https://player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1&autoplay=0" title="Bilibili 示例视频" width="100%" height="468" loading="lazy" allowfullscreen></iframe>

## 无法播放时

先确认原视频可访问、平台允许嵌入，再检查网络和浏览器限制。嵌入播放器由第三方提供，文章中的代码无法保证视频始终可用。
