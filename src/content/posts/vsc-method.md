---
title: VSC常用代码技巧(整理)
published: 2026-02-02
description: 长时间未使用 VS Code 编辑器后，发现许多便捷的 Emmet 缩写方法已生疏。重新查阅资料后，将常用语法整理成笔记，便于共同参考与快速回顾。
image: api
tags:
  - html
  - 示例
category: 文章示例
draft: false
lang: ""
---
# VS Code Emmet 缩写语法速查笔记

长时间未使用 VS Code 编辑器后，发现许多便捷的 Emmet 缩写方法已生疏。重新查阅资料后，将常用语法整理成笔记，便于共同参考与快速回顾。

---

## 一、嵌套 `>`
用于生成父子层级的 HTML 结构。

**输入**：
```html
div>ul>li
```

按下 `Tab` 键后输出：
```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

## 二、并列 `+`
用于生成同级并列的 HTML 元素。

**输入**：
```html
div+p
```

按下 `Tab` 键后输出：
```html
<div></div>
<p></p>
```

## 三、重复 `*`
用于重复生成多个相同元素。

**输入**：
```html
li*3
```

按下 `Tab` 键后输出：
```html
<li></li>
<li></li>
<li></li>
```

## 四、返回上一级 `^`
用于在嵌套结构中返回上一层级，继续生成同级元素。

**输入**：
```html
ul>li*3^p
```

按下 `Tab` 键后输出：
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<p></p>
```

## 五、分组 `()`
用于将部分缩写语法分组，控制生成结构的优先级。

**输入**：
```html
(ul>li*2)+p
```

按下 `Tab` 键后输出：
```html
<ul>
  <li></li>
  <li></li>
</ul>
<p></p>
```

## 六、属性 `[]` 与文本 `{}`
- **属性**：使用 `[属性名=值]` 来定义元素属性
- **文本**：使用 `{文本内容}` 来填充元素内的文本

### 示例 1：ID 与 Class

**输入**：
```html
div#header+div.container+div.foot#footer
```

按下 `Tab` 键后输出：
```html
<div id="header"></div>
<div class="container"></div>
<div class="foot" id="footer"></div>
```

### 示例 2：带属性与文本的输入框

**输入**：
```html
input[name=user value=小李]
```

按下 `Tab` 键后输出：
```html
<input type="text" name="user" value="小李">
```

### 示例 3：Class 与 ID 缩写

**输入**：
```html
div.menu
```

按下 `Tab` 键后输出：
```html
<div class="menu"></div>
```

**输入**：
```html
div#menu
```

按下 `Tab` 键后输出：
```html
<div id="menu"></div>
```

### 示例 4：带文本的列表

**输入**：
```html
ul>li{小李}*3
```

按下 `Tab` 键后输出：
```html
<ul>
  <li>小李</li>
  <li>小李</li>
  <li>小李</li>
</ul>
```

### 示例 5：下拉选项（数字文本）

**输入**：
```html
select>option{$}*5
```

按下 `Tab` 键后输出：
```html
<select name="" id="">
  <option value="">1</option>
  <option value="">2</option>
  <option value="">3</option>
  <option value="">4</option>
  <option value="">5</option>
</select>
```

## 七、自动编号 `$`
用于生成带顺序数字的类名、ID 或文本内容。

**输入**：
```html
ul>li.light-$*3
```

按下 `Tab` 键后输出：
```html
<ul>
  <li class="light-1"></li>
  <li class="light-2"></li>
  <li class="light-3"></li>
</ul>
```

## 八、文本内容 `{}` 与编号结合

**输入**：
```html
ul>li{$}*3
```

按下 `Tab` 键后输出：
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

## 九、CSS 快捷缩写示例
在 CSS 文件中，Emmet 也提供了大量属性缩写，输入后按 `Tab` 键即可快速展开。

| 缩写 | 展开结果 |
|------|----------|
| `w100` | `width: 100px;` |
| `h100` | `height: 100px;` |
| `poa` | `position: absolute;` |
| `por` | `position: relative;` |
| `tdn` | `text-decoration: none;` |
| `db` | `display: block;` |
| `df` | `display: flex;` |
| `fdc` | `flex-direction: column;` |
| `bd1px#cccsolid` | `border: 1px #ccc solid;` |
---

> 提示：以上语法在 VS Code 默认支持的 Emmet 环境下均可使用，适用于 `.html` 与 `.css` 等文件类型。熟练后可极大提升 HTML/CSS 编写效率。