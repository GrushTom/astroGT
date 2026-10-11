---
title: Meowtils 文档教程（三）：扩展开发指南
published: 2026-10-11
description: 梳理 Meowtils 扩展的加载、入口、事件、界面组件、配置及工具 API，并提供章节索引。
image: ''
tags:
- Minecraft
- Meowtils
- 文档整理
- 扩展开发
- Hypixel
category: 游戏指南
draft: false
lang: zh-CN
slug: meowtils/extensions
series: Meowtils 中文文档整理
seriesOrder: 3
sourceLink: https://docs.meowtils.dev/
---

本文依据 [Meowtils 官方文档](https://docs.meowtils.dev/)整理，查阅日期为 **2026-10-11**。内容为非官方中文摘要；模块名称保留英文，具体参数和更新以各节原文为准。

| 阅读目标 | 文章 |
| --- | --- |
| 安装、打开界面与保存配置 | [安装与基础操作](/posts/meowtils/getting-started/) |
| 按游戏场景查找功能 | [功能模块速查](/posts/meowtils/modules/) |
| 编写自己的扩展 | [扩展开发指南](/posts/meowtils/extensions/) |
| 排查异常与寻找支持 | [排错与支持](/posts/meowtils/troubleshooting/) |

## 扩展如何工作

扩展是由 Meowtils 加载的 Java 类归档，文件后缀为 `.meowtils`。把它放入游戏目录下的 Meowtils 扩展文件夹，启动时可自动加载；游戏内可用 `/extensions` 打开目录，用 `/reload` 重载。新增模块会出现在 Extensions 分类。扩展拥有与游戏进程相近的执行权限，应了解来源。参考：[扩展介绍](https://docs.meowtils.dev/extensions/introduction/)。

## 从工程到入口

可从官方示例工程开始，在 `libs` 中放入 Meowtils JAR，并确保名称与 `build.gradle` 一致。目录和依赖问题优先对照[工程设置](https://docs.meowtils.dev/extensions/setup/)。

初始化入口是 `Main.java` 中的 `public static void init()`。加载时在此注册模块、独立事件处理类、命令或图标提供者；模块自身的事件注册由框架处理。参考：[入口](https://docs.meowtils.dev/extensions/entrypoint/)。

运行时加载也带来边界：扩展不支持需要更早介入类转换的 Mixin；反射可用，但跨客户端兼容要处理映射差异。参考：[限制](https://docs.meowtils.dev/extensions/limitations/)。

## 事件负责决定何时执行

事件处理方法使用 `@EventTarget`，按需要检查阶段、类型和优先级。跨客户端扩展应使用 Meowtils 事件；直接依赖 Forge 事件会缩小兼容范围。普通独立处理类需要注册，模块类不必重复注册。访问玩家或世界前检查其是否存在，避免菜单或切换世界期间的空引用。参考：[事件机制](https://docs.meowtils.dev/extensions/events/)。

下面按触发场景列出事件入口，不展开逐项方法签名。

| 事件 | 场景 |
| --- | --- |
| [ClientTickEvent](https://docs.meowtils.dev/extensions/events/clienttickevent/) | 游戏逻辑 tick，可区分执行前后阶段。 |
| [RenderTickEvent](https://docs.meowtils.dev/extensions/events/rendertickevent/) | 每帧渲染 tick；具体 HUD 或世界绘制优先使用专门事件。 |
| [ChatReceivedEvent](https://docs.meowtils.dev/extensions/events/chatreceivedevent/) | 聊天消息到达，可按消息类型处理。 |
| [KeyInputEvent](https://docs.meowtils.dev/extensions/events/keyinputevent/) | Minecraft 已配置按键触发时的输入事件。 |
| [MouseInputEvent](https://docs.meowtils.dev/extensions/events/mouseinputevent/) | 鼠标按键输入及动作类型。 |
| [GuiOpenEvent](https://docs.meowtils.dev/extensions/events/guiopenevent/) | 玩家打开 GUI 时获取当前界面。 |
| [SlotClickEvent](https://docs.meowtils.dev/extensions/events/slotclickevent/) | 背包槽位点击及其交互类型。 |
| [WorldEvent](https://docs.meowtils.dev/extensions/events/worldevent/) | 世界加载与卸载。 |
| [PlayerInteractEvent](https://docs.meowtils.dev/extensions/events/playerinteractevent/) | 与世界方块交互。 |
| [AttackEntityEvent](https://docs.meowtils.dev/extensions/events/attackentityevent/) | 尝试攻击实体。 |
| [EntityJoinWorldEvent](https://docs.meowtils.dev/extensions/events/entityjoinworldevent/) | 实体进入当前世界。 |
| [ReceivePacketEvent](https://docs.meowtils.dev/extensions/events/receivepacketevent/) | 客户端收到服务器数据包。 |
| [SendPacketEvent](https://docs.meowtils.dev/extensions/events/sendpacketevent/) | 客户端发送数据包。 |
| [RenderGameOverlayEvent](https://docs.meowtils.dev/extensions/events/rendergameoverlayevent/) | 屏幕 HUD 绘制。 |
| [RenderWorldLastEvent](https://docs.meowtils.dev/extensions/events/renderworldlastevent/) | 世界渲染结束后的场景绘制。 |
| [RenderStringEvent](https://docs.meowtils.dev/extensions/events/renderstringevent/) | 字符串绘制时处理文本。 |
| [RenderPlayerEvent](https://docs.meowtils.dev/extensions/events/renderplayerevent/) | 玩家渲染的不同阶段。 |
| [MovementInputUpdateEvent](https://docs.meowtils.dev/extensions/events/movementinputupdateevent/) | 本地移动输入状态更新前的回调。 |

并非所有事件都可取消。收发包事件虽然支持取消，但会改变与服务器的交互，不适合作为普通显示功能的默认处理。参考：[接收数据包](https://docs.meowtils.dev/extensions/events/receivepacketevent/)、[发送数据包](https://docs.meowtils.dev/extensions/events/sendpacketevent/)。

## 把功能接入 GUI

模块类继承 `Extension`，用带 `@Config` 的 `enabled` 和 `key` 字段表达开关与快捷键状态。构造阶段添加组件和说明文字，再在入口注册。官方建议按功能拆分扩展，便于独立管理。参考：[模块设置](https://docs.meowtils.dev/extensions/gui/module/)。

| 设置类型 | 组件与原文 | 选择依据 |
| --- | --- | --- |
| 布尔开关 | [toggle](https://docs.meowtils.dev/extensions/gui/components/togglecomponent/) | 主功能开关 |
| 复选项 | [check](https://docs.meowtils.dev/extensions/gui/components/checkcomponent/) | 一组独立选项 |
| 模式选择 | [mode](https://docs.meowtils.dev/extensions/gui/components/modecomponent/) | 有限的字符串选项 |
| 数值滑块 | [slider](https://docs.meowtils.dev/extensions/gui/components/slidercomponent/) | 有上下限及步长的数值 |
| 文本输入 | [text](https://docs.meowtils.dev/extensions/gui/components/textcomponent/) | 用户自定义字符串 |
| 颜色 | [color](https://docs.meowtils.dev/extensions/gui/components/colorcomponent/) | RGB 配置及颜色关联 |
| 饱和度 | [saturation](https://docs.meowtils.dev/extensions/gui/components/saturationcomponent/) | 与颜色关联的饱和度调整 |
| 亮度 | [brightness](https://docs.meowtils.dev/extensions/gui/components/brightnesscomponent/) | 与颜色关联的亮度调整 |
| 透明度 | [opacity](https://docs.meowtils.dev/extensions/gui/components/opacitycomponent/) | 百分比形式的透明度 |
| 快捷键 | [bind](https://docs.meowtils.dev/extensions/gui/components/bindcomponent/) | 键码绑定 |
| 按钮 | [button](https://docs.meowtils.dev/extensions/gui/components/buttoncomponent/) | 点击后执行一次操作 |
| 折叠组 | [expand](https://docs.meowtils.dev/extensions/gui/components/expandcomponent/) | 将相关设置收进可展开区域 |

组件绑定时使用配置字段名，注意数值类型一致；颜色、饱和度和亮度可共享 ColorLink。上表链接分别说明了组件所需参数。

## 生命周期、HUD 与配置

| 环节 | 摘要 |
| --- | --- |
| [onEnable](https://docs.meowtils.dev/extensions/gui/overrides/on-enable/) | 模块启用时执行 |
| [onDisable](https://docs.meowtils.dev/extensions/gui/overrides/on-disable/) | 模块关闭时执行 |
| [onReset](https://docs.meowtils.dev/extensions/gui/overrides/on-reset/) | 切换世界时清理缓存或临时状态 |
| [HUD Editor](https://docs.meowtils.dev/extensions/gui/overrides/hud-editor/) | 为 HUD 提供位置配置和可拖动范围，并考虑编辑器内预览 |
| [Extras](https://docs.meowtils.dev/extensions/gui/extras/) | 添加模块提示、调整模块状态 |

配置字段放在模块类中并加 `@Config`。通过界面组件修改会自动保存；直接在代码中赋值后需要显式保存。可以读取其他模块的公开配置，但跨模块写入会增加依赖，应先确认其副作用。参考：[保存](https://docs.meowtils.dev/extensions/config/saving-values/)、[读取](https://docs.meowtils.dev/extensions/config/reading-values/)、[修改](https://docs.meowtils.dev/extensions/config/modifying-values/)。

## 输出、绘制与工具接口

| 需求 | 原文入口 | 摘要 |
| --- | --- | --- |
| 消息 | [消息 文档](https://docs.meowtils.dev/extensions/basic/send-message/) | 区分本地聊天、发往服务器的消息与日志；调试输出不应误发到公开聊天。 |
| 通知 | [通知 文档](https://docs.meowtils.dev/extensions/basic/notification/) | 显示浮动提示，显示时长使用毫秒；需控制文本长度。 |
| 命令 | [命令 文档](https://docs.meowtils.dev/extensions/basic/commands/) | 定义命令名称与参数处理，可增加别名和补全。 |
| 前缀 | [前缀 文档](https://docs.meowtils.dev/extensions/basic/prefix/) | 修改全局消息前缀时要考虑其他扩展的竞争。 |
| HUD 文本 | [HUD 文本 文档](https://docs.meowtils.dev/extensions/render/hud-text/) | 在屏幕覆盖层事件中绘制文字。 |
| 实体标记 | [实体标记 文档](https://docs.meowtils.dev/extensions/render/entity-esp/) | 在世界绘制事件中为实体添加视觉标记。 |
| 槽位背景 | [槽位背景 文档](https://docs.meowtils.dev/extensions/render/slot-background/) | 实现并注册槽位提供者；不作用于快捷栏或拿起中的物品。 |
| 名称图标 | [名称图标 文档](https://docs.meowtils.dev/extensions/render/name-icons/) | 提供玩家名称前后缀，可区分 Tab 列表与名称标签。 |
| 物品图标 | [物品图标 文档](https://docs.meowtils.dev/extensions/render/item-icons/) | 在屏幕绘制事件中显示 ItemStack 图标。 |
| Session | [Session 文档](https://docs.meowtils.dev/extensions/util/session/) | 根据计分板等信息判断服务器与游戏阶段。 |
| Team | [Team 文档](https://docs.meowtils.dev/extensions/util/team/) | 复用队友与机器人判断，结果受设置和服务器行为影响。 |
| Color | [Color 文档](https://docs.meowtils.dev/extensions/util/color/) | 进行颜色构造、格式转换及相关处理。 |
| Delayed Task | [Delayed Task 文档](https://docs.meowtils.dev/extensions/util/delayed-task/) | 以 tick 为单位安排延迟执行。 |
| Click | [Click 文档](https://docs.meowtils.dev/extensions/util/click/) | 通过游戏按键机制执行点击操作。 |
| Sound | [Sound 文档](https://docs.meowtils.dev/extensions/util/sound/) | 播放预定义提示音并设置音量。 |
| Scoreboard | [Scoreboard 文档](https://docs.meowtils.dev/extensions/util/scoreboard/) | 读取侧边栏标题、行内容，或判断是否包含指定文字。 |
| Extra | [Extra 文档](https://docs.meowtils.dev/extensions/util/extra/) | 查询类是否加载、打开文件夹和处理时间或数字文本。 |

## 建议的实现顺序

以下是整理者给出的开发顺序：先让一个最小模块能够加载和切换，再接入单一事件；随后添加配置和一个界面组件，最后验证切换世界、禁用模块和重新加载扩展后的状态。完整实现及导入路径应对照当前版本的官方示例工程；本文没有把示例编译测试成可分发扩展。
