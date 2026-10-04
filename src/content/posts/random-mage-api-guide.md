---
title: "Random Mage 图片 API 使用教程：从随机出图到自定义筛选"
published: 2026-10-05
description: "从随机出图入门，掌握 Random Mage 图片 API 的标签、尺寸、AI 类型筛选，以及批量 JSON、瀑布流、镜像和网页接入方法。"
image: ""
tags:
  - API
  - 图片
  - 教程
  - Python
category: 技术教程
draft: false
lang: zh_CN
slug: random-mage-api-guide
---

整理日期：2026-10-05  
文档来源：[Random Mage 官方文档](https://i.mukyu.ru/docs) · [OpenAPI](https://i.mukyu.ru/openapi.json)

想给个人主页添加随机背景，或者按标签、尺寸和作品类型挑选图片？Random Mage 提供了直接返回图片、返回 JSON 数据以及瀑布流浏览等用法。本文从一条可直接打开的链接开始，逐步介绍如何组合参数，以及如何接入网页和 Python 程序。

本文统一使用 HTTPS，示例默认选择全年龄内容。服务的图库、访问鉴权和可用性可能调整，接口细节以官方文档为准。

## 1. 先获取第一张图片

在浏览器中打开：

```text
https://i.mukyu.ru/random?r18=0
```

`/random` 默认返回图片，不需要先解析 JSON。将这条链接放进 HTML 的 `img` 标签，也可以显示图片：

```html
<img
  src="https://i.mukyu.ru/random?r18=0&amp;orientation=landscape"
  alt="随机横向插画"
  loading="lazy"
  style="max-width: 100%; height: auto;"
>
```

URL 中，第一个参数前使用 `?`，后续参数通过 `&` 连接；写在 HTML 属性中时使用 `&amp;`。

如果希望接口重定向到具体的缓存或代理图片路径，可以加上 `redirect=1`：

```text
https://i.mukyu.ru/random?r18=0&redirect=1
```

这个参数控制的是返回方式。再次请求同一个 `/random` 地址仍可能选到其他图片；需要引用某张图片时，应使用接口返回的具体图片地址。

## 2. 按需求选择接口

| 接口 | 用途 | 适合的场景 |
| --- | --- | --- |
| `/random` | 默认直接出图，也可切换 JSON | 随机背景、单张预览 |
| `/feed?limit=8` | 批量返回图片数据 | 获取多张图片地址、自建列表 |
| `/i/{id}.{ext}` | 获取指定图库图片 | 已知图片 ID 时引用图片 |
| `/wtf` | 打开现成的图片浏览页面 | 瀑布流、网格、单张浏览 |
| `/tags` | 查看标签列表 | 查找可用标签 |
| `/authors` | 查看作者列表 | 查找作者信息 |
| `/images` | 查看图片列表 | 查找图库图片信息 |
| `/images/{id}` | 查看指定图片详情 | 获取单张图片元数据 |
| `/status` | 查看服务状态页面 | 排查服务异常 |
| `/status.json` | 获取机器可读状态 | 程序检查运行状态 |

其中 `{id}` 和 `{ext}` 都是占位符，需要替换为实际值，不要保留花括号。所有接口都以 `https://i.mukyu.ru` 为前缀。

## 3. 选择横图、竖图和作品类型

### 图片方向

`orientation` 可以设置为：

| 值 | 含义 |
| --- | --- |
| `any` | 不限制方向 |
| `landscape` | 横图 |
| `portrait` | 竖图 |
| `square` | 方图 |

例如，获取全年龄竖图：

```text
https://i.mukyu.ru/random?r18=0&orientation=portrait
```

也可以通过 `adaptive=1` 开启屏幕自适应。服务会根据移动端或 PC 调整默认方向与像素门槛，但不会覆盖你显式指定的筛选条件。

```text
https://i.mukyu.ru/random?r18=0&adaptive=1
```

### AI 与作品类型

| 参数 | 可选值 |
| --- | --- |
| `ai_type` | `any` 不限、`0` 非 AI、`1` AI |
| `illust_type` | `any` 不限、`illust` 插画、`manga` 漫画、`ugoira` 动图作品 |

例如，只选择非 AI 的横向插画：

```text
https://i.mukyu.ru/random?r18=0&orientation=landscape&ai_type=0&illust_type=illust
```

作品类型是元数据筛选条件，并不代表接口会把图片转换为某种文件格式。

### 内容分级

`r18=0` 为全年龄，也是默认值；`r18=1` 仅选择 R18；`r18=2` 不限制这两类内容。

官方文档还提供 `r18=0&r18_strict=0` 的组合，允许分级元数据未知的作品进入结果。未知分级不等于已确认全年龄，公共页面应根据自己的展示需求选择。

## 4. 用标签组合筛选条件

包含标签使用 `included_tags`，排除标签使用 `excluded_tags`。可以先查看[标签列表](https://i.mukyu.ru/tags)，确认图库使用的实际标签。

标签筛选有两条关键规则：

- 重复 `included_tags` 参数表示 AND：每组条件都必须满足。
- 同一个参数里的 `|` 表示 OR：该组满足一个标签即可。

例如，要求同时包含 `landscape` 和 `night`：

```text
https://i.mukyu.ru/random?r18=0&included_tags=landscape&included_tags=night
```

要求包含 `landscape`，并且包含 `night` 或 `sunset`：

```text
https://i.mukyu.ru/random?r18=0&included_tags=landscape&included_tags=night%7Csunset
```

这里 `%7C` 是 `|` 的 URL 编码。示例标签用于解释语法，不保证当前图库中存在匹配结果。

排除多个标签时，命中任意一个就会被排除：

```text
https://i.mukyu.ru/random?r18=0&excluded_tags=tag_a&excluded_tags=tag_b
```

不要用普通逗号替代 API 的重复参数。配套个人主页项目中的图片控件会将输入框里的逗号自动转换为重复参数，但这是控件提供的输入便利功能。

## 5. 筛选尺寸、热度、作者与发布时间

| 参数 | 作用 | 示例值 |
| --- | --- | --- |
| `min_width` | 最小宽度 | `1920` |
| `min_height` | 最小高度 | `1080` |
| `min_pixels` | 最少总像素数 | `2000000`，约 200 万像素 |
| `min_bookmarks` | 最少收藏数 | `100` |
| `min_views` | 最少浏览数 | `1000` |
| `min_comments` | 最少评论数 | `5` |
| `user_id` | 限定 Pixiv 作者 ID | 填写实际作者 ID |
| `created_from` | 发布时间下界 | `2025-01-01T00:00:00Z` |
| `created_to` | 发布时间上界 | `2025-12-31T23:59:59Z` |

以下链接组合了横图、非 AI、最小尺寸和收藏数条件：

```text
https://i.mukyu.ru/random?r18=0&orientation=landscape&ai_type=0&min_width=1920&min_height=1080&min_bookmarks=100
```

这些参数用于筛选原图，不会把图片裁剪或缩放成指定尺寸。热度等条件也依赖图库元数据的完整程度。

日期采用 ISO 8601 格式，示例中的 `Z` 表示 UTC。组合条件越多，匹配范围越小；遇到无结果时，可以先去掉热度和尺寸限制，再逐项添加。

## 6. 质量优先还是纯随机？

`strategy=quality` 是默认策略：先抽取候选图片，再根据热度、分辨率等因素选图。`strategy=random` 则使用纯随机策略。

```text
https://i.mukyu.ru/random?r18=0&strategy=random
```

质量优先模式可通过 `quality_samples` 调整候选数量，文档给出的范围是 `1–1000`：

```text
https://i.mukyu.ru/random?r18=0&strategy=quality&quality_samples=100&min_pixels=2000000
```

候选数量越大，服务端开销也越大，并不保证一定得到更符合个人审美的图片。

如果需要更容易复现结果，可以设置 `seed`：

```text
https://i.mukyu.ru/random?r18=0&strategy=random&seed=homepage-demo
```

文档将其描述为“更容易复现”，不应把它当作永久绑定某张图片的标识。

## 7. 获取 JSON 与批量图片数据

### 单张数据

通过 `format` 切换返回格式：

```text
https://i.mukyu.ru/random?r18=0&format=json
https://i.mukyu.ru/random?r18=0&format=simple_json
```

`json` 返回较完整的数据，包括标签；`simple_json` 更精简。JSON 接口返回的是数据，不能直接当作 `img` 标签的图片地址。

### 批量数据

`/feed` 一次返回多张图片的数据，例如请求 8 张横图：

```text
https://i.mukyu.ru/feed?limit=8&r18=0&orientation=landscape
```

批量请求的结果数量应以实际响应为准，不要假设永远等于请求的 `limit`。

下面的 Python 示例读取批量响应，并将图片的相对路径转换为完整 URL。需要先安装 `requests`：

```bash
python -m pip install requests
```

```python
from urllib.parse import urljoin

import requests

BASE = "https://i.mukyu.ru"

try:
    response = requests.get(
        f"{BASE}/feed",
        params={
            "limit": 4,
            "r18": 0,
            "orientation": "landscape",
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    if not payload.get("ok"):
        raise ValueError(f"接口返回失败：{payload.get('code', 'UNKNOWN')}")

    items = payload.get("data", {}).get("items", [])
    if not items:
        print("没有匹配图片，请尝试减少筛选条件。")

    for item in items:
        local_path = item.get("urls", {}).get("local")
        if local_path:
            print(urljoin(BASE, local_path))
except (requests.RequestException, ValueError) as error:
    print(f"获取图片失败：{error}")
```

此示例的 `data.items` 和 `urls.local` 字段根据整理时的 `/feed` 实际响应编写。若接口版本发生变化，请核对当前响应结构。

## 8. 引用指定图片

拿到 `urls.local` 后，可以直接使用其中的 `/i/{id}.{ext}` 路径。这是图库图片 ID，不是 Pixiv 作品 ID；扩展名也要与实际图片一致。

例如，响应中如果包含：

```json
{
  "urls": {
    "local": "/i/628212.jpg"
  }
}
```

则完整地址为：

```text
https://i.mukyu.ru/i/628212.jpg
```

这是整理时使用的示例图片地址，不保证长期保留。项目接入时应从当前响应中获取地址。

文档也列出了按 Pixiv 作品编号访问的旧式路径 `/{illust_id}.{ext}` 和 `/{illust_id}-{page}.{ext}`，新接入优先使用 `/i/` 路径。

## 9. 直接使用瀑布流页面

如果只想浏览图片，无需自己编写图库界面，直接打开：

```text
https://i.mukyu.ru/wtf?r18=0&orientation=portrait&view=masonry
```

`/wtf` 支持 `/random` 的过滤条件，并默认补充 `adaptive=1`。通过 `view` 选择布局：

| 值 | 页面布局 |
| --- | --- |
| `single` | 单张浏览 |
| `masonry` | 瀑布流 |
| `tiles` | 网格 |

文档还列出了 `wtf_mcols`、`wtf_mgap`、`wtf_tcols`、`wtf_tgap` 和 `wtf_tratio` 等布局参数。这些参数只影响浏览页面的布局，不改变原始图片。

## 10. 图片加载慢时切换镜像

可以使用 `proxy` 指定图片上游镜像：

```text
https://i.mukyu.ru/random?r18=0&proxy=re
```

内置简写包括 `cat`、`re` 和 `nl`，对应 `i.pixiv.cat`、`i.pixiv.re` 和 `i.pixiv.nl`。指定 `proxy` 会隐式开启第三方镜像，并优先于地区自动选择。

另一种写法是：

```text
https://i.mukyu.ru/random?r18=0&pixiv_cat=1&pximg_mirror_host=re
```

镜像参数影响服务端获取图片的上游来源，不需要手动替换客户端请求的 API 域名。自定义镜像域名需要服务端白名单允许。

## 11. API Key 与浏览器跨域

公开接口是否需要 API Key，由服务端配置决定。需要鉴权时，程序调用优先把密钥放进 `X-API-Key` 请求头：

```bash
curl -H "X-API-Key: YOUR_KEY" \
  "https://i.mukyu.ru/feed?limit=4&r18=0"
```

`YOUR_KEY` 是占位符。对于图片标签或直接打开链接等无法自行设置请求头的场景，服务也支持 `api_key=YOUR_KEY` 查询参数。包含密钥的链接不适合写入公开教程、代码仓库或公开分享。

`/docs`、`/wtf` 和状态等页面本身可豁免鉴权，但 `/wtf` 内部获取数据或图片时仍可能需要密钥。

浏览器加载跨站图片与 JavaScript 读取跨站 JSON 是两回事。`img` 可以显示图片，不代表 `fetch()` 一定能读取该接口的 JSON；后者取决于服务是否允许当前站点跨域访问。遇到跨域限制时，可在新窗口打开数据链接，或由自己的后端调用 API。`mode: "no-cors"` 不会让前端得到可读取的 JSON。

## 12. 排查常见问题

| 现象 | 检查方向 |
| --- | --- |
| 筛选后没有图片 | 先减少标签、热度、分辨率等条件，确认有匹配作品 |
| 图片加载失败或较慢 | 检查服务状态，尝试其他镜像；避免连续大量请求 |
| 图片位置显示不了内容 | 检查是否误用了 `format=json` 或 `/feed` 数据接口 |
| 指定图片无法打开 | 检查图库 ID、文件扩展名以及图片是否仍然存在 |
| 返回鉴权或限流错误 | 检查 API Key 与响应提示；限流时降低请求频率并稍后重试 |
| Python 能请求，浏览器 `fetch()` 失败 | 检查浏览器控制台中的跨域错误 |
| 固定种子仍未获得相同图片 | `seed` 不是永久图片 ID，固定引用应使用具体图片路径 |

需要进一步排查时，可以给 JSON 请求增加 `debug=1`：

```text
https://i.mukyu.ru/random?r18=0&format=json&debug=1
https://i.mukyu.ru/feed?limit=4&r18=0&debug=1
```

调试信息默认不返回。批量接口的调试数据位于响应外层的 `data.debug`，而不是每个图片条目中。

## 13. 配套个人主页控件的使用方式

在配套的 Card_Page 个人主页项目中，常用参数已整理成可视化控件。以下操作适用于已集成该控件的个人主页，不是 Firefly 主题的内置功能。点击该个人主页顶栏的图片图标即可打开菜单：

1. 选择随机图片、批量数据、指定图片或瀑布流。
2. 设置图片方向、作品类型、AI 类型和标签。
3. 按需展开更多筛选，填写尺寸、热度、作者或日期。
4. 随机图片模式下点击“预览 / 换一张”，加载成功后可设为背景。
5. 使用“复制链接”获取当前条件对应的 API 地址。

批量 JSON 和瀑布流在新窗口打开。设置的背景只在当前页面生效，可以随时点击“恢复原背景”；可选密钥不会持久保存。

## 参考资料

- [官方使用文档](https://i.mukyu.ru/docs)
- [Swagger 接口文档](https://i.mukyu.ru/api/docs)
- [OpenAPI 定义](https://i.mukyu.ru/openapi.json)
- [服务运行状态](https://i.mukyu.ru/status)
