---
title: Meowtils 文档教程（一）：安装与基础操作
published: 2026-10-11
description: 概括 Forge 与 Lunar Client 安装方式、界面操作、配置管理和自动更新，附官方文档入口。
image: ''
tags:
- Minecraft
- Meowtils
- 文档整理
- Hypixel
category: 游戏指南
draft: false
lang: zh-CN
slug: meowtils/getting-started
series: Meowtils 中文文档整理
seriesOrder: 1
sourceLink: https://docs.meowtils.dev/
---

本文依据 [Meowtils 官方文档](https://docs.meowtils.dev/)整理，查阅日期为 **2026-10-11**。内容为非官方中文摘要；模块名称保留英文，具体参数和更新以各节原文为准。

| 阅读目标 | 文章 |
| --- | --- |
| 安装、打开界面与保存配置 | [安装与基础操作](/posts/meowtils/getting-started/) |
| 按游戏场景查找功能 | [功能模块速查](/posts/meowtils/modules/) |
| 编写自己的扩展 | [扩展开发指南](/posts/meowtils/extensions/) |
| 排查异常与寻找支持 | [排错与支持](/posts/meowtils/troubleshooting/) |

## Meowtils 适合做什么

Meowtils 面向 Minecraft 1.8.9，功能围绕 Hypixel 等服务器的游戏信息、界面显示与日常操作展开，也允许通过扩展添加自定义功能。普通玩家可以先看操作与模块篇；有 Java 基础的读者再进入扩展篇。参考：[项目介绍](https://docs.meowtils.dev/)。

## 选择安装方式

| 环境 | 主要步骤 | 需要注意 |
| --- | --- | --- |
| Forge 1.8.9 | 安装对应 Forge，启动一次游戏，再将 Meowtils JAR 放入该实例的 `mods` 目录 | 第三方启动器的实例目录可能不同 |
| Lunar Client | 运行 Meowtils 安装器，使用 Lunar 安装入口，再把生成的参数加入启动器的 JVM Arguments | 参数与安装目录有关，不要照抄他人的路径 |

安装完成后启动游戏确认加载。Lunar 手动安装涉及代理 JAR、JSON 和 JVM 参数，适合作为安装器失败后的备用流程，具体操作见[安装文档](https://docs.meowtils.dev/guides/installation/)。

## 第一次打开界面

| 操作 | 方法 |
| --- | --- |
| 打开 GUI | 默认按右 Shift；也可输入 `/meowtilsgui` |
| 展开分类或模块设置 | 右键点击对应项目 |
| 开关模块 | 左键点击模块 |
| 绑定快捷键 | 中键点击模块后按目标键；Backspace 清除绑定 |
| 调整 HUD | 从 GUI 左下角进入 HUD Editor，拖动已启用模块的显示元素 |

若快捷键冲突，可用 `/bind` 调整。分类过长时，将鼠标放在分类上滚动；未启用模块的 HUD 不会显示预览。参考：[基本使用](https://docs.meowtils.dev/guides/basic-usage/)。

## 把通用设置与具体功能分开

GUI 管理主题、缩放、提示和功能范围；Settings 管理字体、聊天前缀、通知与 API；Config 管理配置方案。它们负责使用环境，不等同于某个对局功能的开关。

- [GUI](https://docs.meowtils.dev/modules/meowtils/gui/)：界面太小或列表难以浏览时，先调整缩放与滚动速度。
- [Settings](https://docs.meowtils.dev/modules/meowtils/settings/)：通知可使用聊天、浮动提示或两者；聊天复制功能可能与其他客户端重叠。
- [Config](https://docs.meowtils.dev/modules/meowtils/config/)：支持加载、新建和复制。修改配置文件后可重新加载；重名创建会添加编号。

整理建议：先保存一份基础配置，再复制出不同游戏模式的配置，方便对比和恢复。

## 常用命令入口

| 命令 | 用途 |
| --- | --- |
| `/meow` | 查看当前安装版本提供的命令 |
| `/meowfolder` | 打开 Meowtils 数据目录 |
| `/config folder` | 打开配置目录 |
| `/send <command>` | 绕过客户端同名命令，将命令交给服务器 |

命令清单可能随版本变化，以游戏内输出为准。参考：[命令文档](https://docs.meowtils.dev/other/commands/)、[基本使用](https://docs.meowtils.dev/guides/basic-usage/)、[配置管理](https://docs.meowtils.dev/modules/meowtils/config/)。

## 更新在什么时候生效

自动更新会检查新版本并下载文件，在关闭游戏后替换，下次启动时使用新版本。关闭自动更新后仍会收到更新提示，需要自行替换文件；Lunar 环境还要注意文件名与启动配置一致。参考：[自动更新](https://docs.meowtils.dev/other/auto-updates/)。

下一步可以阅读[功能模块速查](/posts/meowtils/modules/)，按需要查找功能，而不是一次开启全部模块。
