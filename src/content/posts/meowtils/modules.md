---
title: Meowtils 文档教程（二）：功能模块速查
published: 2026-10-11
description: 按八个分类整理 81 个控制与功能条目，概括用途、原文风险标签、战绩依赖和个人名单区别。
image: ''
tags:
- Minecraft
- Meowtils
- 文档整理
- Hypixel
category: 游戏指南
draft: false
lang: zh-CN
slug: meowtils/modules
series: Meowtils 中文文档整理
seriesOrder: 2
sourceLink: https://docs.meowtils.dev/
---

本文依据 [Meowtils 官方文档](https://docs.meowtils.dev/)整理，查阅日期为 **2026-10-11**。内容为非官方中文摘要；模块名称保留英文，具体参数和更新以各节原文为准。

| 阅读目标 | 文章 |
| --- | --- |
| 安装、打开界面与保存配置 | [安装与基础操作](/posts/meowtils/getting-started/) |
| 按游戏场景查找功能 | [功能模块速查](/posts/meowtils/modules/) |
| 编写自己的扩展 | [扩展开发指南](/posts/meowtils/extensions/) |
| 排查异常与寻找支持 | [排错与支持](/posts/meowtils/troubleshooting/) |

## 如何阅读功能表

本篇汇总官方 Modules 下的 **81 个条目**：5 个通用控制项与 76 个功能模块。点击英文名称可查看完整参数。HUD 指屏幕信息显示，ESP 指为目标增加轮廓、色块等视觉标记。

表中的 Legit、Safe、Blatant 是文档作者的分类，不是服务器许可承诺。GUI 可以按功能范围隐藏并禁用部分模块，但仍需结合所在服务器规则判断。参考：[服务器使用说明](https://docs.meowtils.dev/guides/server-safety/)、[GUI](https://docs.meowtils.dev/modules/meowtils/gui/)。

## 通用控制：Meowtils

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [GUI](https://docs.meowtils.dev/modules/meowtils/gui/) | 界面主题、缩放、滚动速度与功能范围控制。 | — |
| [Settings](https://docs.meowtils.dev/modules/meowtils/settings/) | 全局通知、字体、聊天前缀、更新与 API 配置。 | — |
| [Config](https://docs.meowtils.dev/modules/meowtils/config/) | 加载、新建、复制配置；用于管理多套设置。 | — |
| [Teams](https://docs.meowtils.dev/modules/meowtils/teams/) | 按队伍、好友和机器人识别结果过滤目标。 | — |
| [Icons](https://docs.meowtils.dev/modules/meowtils/icons/) | 调整玩家名称和 Tab 列表中图标的显示位置与内容。 | — |

## 服务器服务：Hypixel

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [AccountHider](https://docs.meowtils.dev/modules/hypixel/accounthider/) | 在本地隐藏部分账号信息；不等于修改服务器记录。 | Legit |
| [AutoChannel](https://docs.meowtils.dev/modules/hypixel/autochannel/) | 随加入或离开队伍切换聊天频道。 | Legit |
| [AutoGG](https://docs.meowtils.dev/modules/hypixel/autogg/) | 在对局开始前或结束后发送预设消息。 | Legit |
| [AutoTip](https://docs.meowtils.dev/modules/hypixel/autotip/) | 自动执行 Hypixel 的打赏操作，可设置间隔与消息显示。 | Legit |
| [AutoWho](https://docs.meowtils.dev/modules/hypixel/autowho/) | 开局后自动执行玩家列表查询，为其他功能提供信息。 | Legit |
| [Denicker](https://docs.meowtils.dev/modules/hypixel/denicker/) | 识别昵称伪装，并在满足皮肤等条件时尝试还原用户名。 | Legit |
| [MurdererFinder](https://docs.meowtils.dev/modules/hypixel/murdererfinder/) | 在密室杀手模式中识别并显示相关角色。 | Safe |
| [NickBot](https://docs.meowtils.dev/modules/hypixel/nickbot/) | 自动反复选择昵称，直到符合设定条件。 | Safe |
| [PartyNotifier](https://docs.meowtils.dev/modules/hypixel/partynotifier/) | 把相关模块产生的提醒发送到队伍聊天，需启用对应模块。 | Legit |
| [Requeue](https://docs.meowtils.dev/modules/hypixel/requeue/) | 记录上一场游戏类型，方便重新排队。 | Legit |
| [SessionStats](https://docs.meowtils.dev/modules/hypixel/sessionstats/) | 展示本次运行或单局内自己的游戏统计。 | Legit |
| [Stats](https://docs.meowtils.dev/modules/hypixel/stats/) | 展示其他玩家战绩，支持缓存、请求间隔及不同显示位置。 | Legit |

## 空岛战争：Skywars

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [CooldownHUD](https://docs.meowtils.dev/modules/skywars/cooldownhud/) | 在 HUD 展示开局后的物品冷却。 | Legit |
| [EquipAlerts](https://docs.meowtils.dev/modules/skywars/equipalerts/) | 提醒其他玩家穿上钻石盔甲。 | Safe |
| [ItemHighlight](https://docs.meowtils.dev/modules/skywars/itemhighlight/) | 使用背包槽位底色突出重要物品。 | Legit |
| [MiningAlerts](https://docs.meowtils.dev/modules/skywars/miningalerts/) | 提醒玩家挖掘钻石矿的行为。 | Safe |
| [NoArmorDye](https://docs.meowtils.dev/modules/skywars/noarmordye/) | 移除皮革盔甲的染色显示，提高辨认度。 | Legit |
| [PearlDetector](https://docs.meowtils.dev/modules/skywars/pearldetector/) | 跟踪已投掷的末影珍珠及其位置，并提供计时显示。 | Legit |
| [SkywarsAlerts](https://docs.meowtils.dev/modules/skywars/skywarsalerts/) | 提醒玩家手持关键道具。 | Safe |
| [StrengthESP](https://docs.meowtils.dev/modules/skywars/strengthesp/) | 标记处于力量效果中的玩家。 | Safe |

## 起床战争：Bedwars

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [AntiMisplace](https://docs.meowtils.dev/modules/bedwars/antimisplace/) | 通过取消不合适的放置操作，避免把黑曜石放在床以外的位置。 | Legit |
| [ArmorAlerts](https://docs.meowtils.dev/modules/bedwars/armoralerts/) | 提醒玩家购买盔甲升级。 | Safe |
| [BedESP](https://docs.meowtils.dev/modules/bedwars/bedesp/) | 突出显示床与黑曜石的位置。 | Safe |
| [BedTracker](https://docs.meowtils.dev/modules/bedwars/bedtracker/) | 跟踪己方床的位置，并提示接近的敌人。 | Safe |
| [ConsumeAlerts](https://docs.meowtils.dev/modules/bedwars/consumealerts/) | 提醒玩家使用特定消耗品。 | Safe |
| [EventTimers](https://docs.meowtils.dev/modules/bedwars/eventtimers/) | 显示对局事件与资源生成等计时信息。 | Legit |
| [HeightOverlay](https://docs.meowtils.dev/modules/bedwars/heightoverlay/) | 显示地图建造高度上限及相关高度信息。 | Legit |
| [ItemAlerts](https://docs.meowtils.dev/modules/bedwars/itemalerts/) | 提醒玩家手持起床战争中的关键物品。 | Safe |
| [PickupAlerts](https://docs.meowtils.dev/modules/bedwars/pickupalerts/) | 报告资源拾取情况；可见范围受实体渲染距离影响。 | Safe |
| [ResourceTracker](https://docs.meowtils.dev/modules/bedwars/resourcetracker/) | 记录背包与末影箱内的资源，并显示变化。 | Legit |
| [ShopHelper](https://docs.meowtils.dev/modules/bedwars/shophelper/) | 为商店提供购买能力高亮与交互辅助。 | Legit |
| [TrapNotifier](https://docs.meowtils.dev/modules/bedwars/trapnotifier/) | 提示陷阱触发或己方缺少陷阱的状态。 | Legit |
| [UpgradeAlerts](https://docs.meowtils.dev/modules/bedwars/upgradealerts/) | 提醒队伍购买锋利、保护等升级。 | Safe |
| [UpgradeHUD](https://docs.meowtils.dev/modules/bedwars/upgradehud/) | 在 HUD 展示团队升级状态。 | Legit |

## 画面与 HUD：Render

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [Animations](https://docs.meowtils.dev/modules/render/animations/) | 改变部分动作的视觉表现，不直接改变游戏机制。 | Legit |
| [Anti-Invis](https://docs.meowtils.dev/modules/render/antiinvis/) | 将隐形玩家绘制为半透明形态。 | Safe |
| [BlockCount](https://docs.meowtils.dev/modules/render/blockcount/) | 显示手持方块数量，并在不足时提醒。 | Legit |
| [BreakProgress](https://docs.meowtils.dev/modules/render/breakprogress/) | 显示方块破坏进度或预计剩余时间。 | Legit |
| [Cape](https://docs.meowtils.dev/modules/render/cape/) | 设置自己或其他玩家的客户端披风显示。 | Legit |
| [ChestESP](https://docs.meowtils.dev/modules/render/chestesp/) | 标记箱子，可按是否打开过等条件显示。 | Safe |
| [ConsumeTimer](https://docs.meowtils.dev/modules/render/consumetimer/) | 显示物品食用或使用过程的剩余时间。 | Legit |
| [DamageTags](https://docs.meowtils.dev/modules/render/damagetags/) | 以文字显示命中后的伤害信息。 | Legit |
| [HealthDisplay](https://docs.meowtils.dev/modules/render/healthdisplay/) | 集中展示自身及相关生命值信息。 | Legit |
| [HealthESP](https://docs.meowtils.dev/modules/render/healthesp/) | 在玩家附近显示生命条。 | Safe |
| [Indicators](https://docs.meowtils.dev/modules/render/indicators/) | 突出危险投射物；视觉扩大不会改变实际碰撞体积。 | Legit |
| [InstantHurt](https://docs.meowtils.dev/modules/render/instanthurt/) | 提前显示命中后的受伤动画，仅影响画面。 | Legit |
| [ItemESP](https://docs.meowtils.dev/modules/render/itemesp/) | 为地面掉落物绘制标记与文字。 | Safe |
| [ItemScale](https://docs.meowtils.dev/modules/render/itemscale/) | 调整掉落物的视觉大小，可只作用于重要物品。 | Legit |
| [PingHUD](https://docs.meowtils.dev/modules/render/pinghud/) | 展示与服务器的延迟估计，周期性检测而非逐帧实时测速。 | Legit |
| [PotionHUD](https://docs.meowtils.dev/modules/render/potionhud/) | 在 HUD 显示重要药水效果。 | Legit |
| [ShinyPots](https://docs.meowtils.dev/modules/render/shinypots/) | 用药水颜色作为槽位底色，便于辨认。 | Legit |
| [TimeChanger](https://docs.meowtils.dev/modules/render/timechanger/) | 修改本地看到的时间，不改变服务器时间。 | Legit |
| [Trajectories](https://docs.meowtils.dev/modules/render/trajectories/) | 预览可投掷物的轨迹与目标位置。 | Legit |

## 玩家观察与名单联动：Antisnipe

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [AntiCheat](https://docs.meowtils.dev/modules/antisnipe/anticheat/) | 根据观察到的行为提示可疑玩家，存在误判可能。 | Legit |
| [AutoBlacklist](https://docs.meowtils.dev/modules/antisnipe/autoblacklist/) | 按告警、举报等选定事件将玩家加入个人黑名单。 | Legit |
| [AutoSafelist](https://docs.meowtils.dev/modules/antisnipe/autosafelist/) | 将发生最终死亡的玩家自动加入个人安全名单。 | Legit |
| [PartyDetector](https://docs.meowtils.dev/modules/antisnipe/partydetector/) | 依据玩家短时间内加入大厅的情况估计组队，结果并非精确队伍名单。 | Legit |
| [SniperWarning](https://docs.meowtils.dev/modules/antisnipe/sniperwarning/) | 结合名称、装备或战绩特征提示可能的狙击账号，不能作为确定结论。 | Legit |

## 日常操作：Utility

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [ActionSounds](https://docs.meowtils.dev/modules/utility/actionsounds/) | 为格挡、暴击等动作添加音效反馈。 | Legit |
| [AntiObfuscate](https://docs.meowtils.dev/modules/utility/antiobfuscate/) | 移除文本混淆格式；不能凭空恢复服务器未发送的信息。 | Legit |
| [AutoText](https://docs.meowtils.dev/modules/utility/autotext/) | 通过快捷键发送预设文字或命令，可设置按住重复。 | Legit |
| [ChatFilter](https://docs.meowtils.dev/modules/utility/chatfilter/) | 按文本规则过滤聊天，支持包含、相等、前后缀及组合条件。 | Legit |
| [FlagDetector](https://docs.meowtils.dev/modules/utility/flagdetector/) | 在可能触发反作弊判定时提醒，可调节冷却与加入世界后的处理。 | Legit |
| [Freelook](https://docs.meowtils.dev/modules/utility/freelook/) | 第三人称观察周围而不改变服务器端视角方向。 | Legit |
| [HotbarLock](https://docs.meowtils.dev/modules/utility/hotbarlock/) | 锁定快捷栏槽位，减少误丢物品。 | Legit |
| [LatencyAlerts](https://docs.meowtils.dev/modules/utility/latencyalerts/) | 提醒与服务器通信异常；不同服务器上的表现可能不同。 | Legit |
| [NoParticles](https://docs.meowtils.dev/modules/utility/noparticles/) | 减少指定粒子效果，改善可见度与性能。 | Legit |
| [NoTitles](https://docs.meowtils.dev/modules/utility/notitles/) | 隐藏屏幕标题，减少画面遮挡。 | Legit |
| [NullMove](https://docs.meowtils.dev/modules/utility/nullmove/) | 方向键冲突时优先处理较新的输入。 | Legit |
| [Sprint](https://docs.meowtils.dev/modules/utility/sprint/) | 提供保持疾跑的操作方式。 | Legit |
| [ViewClip](https://docs.meowtils.dev/modules/utility/viewclip/) | 允许第三人称相机穿过方块观察。 | Safe |

## 自动化与交互调整：Advanced

| 名称与原文 | 中文用途摘要 | 原文标签 |
| --- | --- | --- |
| [AutoChest](https://docs.meowtils.dev/modules/advanced/autochest/) | 自动向起床战争箱子存入资源；属于自动化交互。 | Blatant |
| [AutoStairs](https://docs.meowtils.dev/modules/advanced/autostairs/) | 上楼梯时自动跳跃，改变移动操作方式。 | Blatant |
| [AutoSwap](https://docs.meowtils.dev/modules/advanced/autoswap/) | 在物品将耗尽等情况下自动切换物品或槽位。 | Blatant |
| [DelayRemover](https://docs.meowtils.dev/modules/advanced/delayremover/) | 调整破坏、使用、攻击或跳跃相关延迟；各子选项行为不同。 | Blatant |
| [GhostHand](https://docs.meowtils.dev/modules/advanced/ghosthand/) | 允许隔着实体与后方目标交互，并可限定适用物品或方块。 | Blatant |

## 功能之间的依赖

- 战绩未显示时，先检查 Stats 的数据源与 API 设置；聊天形式的部分战绩输出依赖 AutoWho 或手动执行 `/who`。频繁清缓存可能增加请求压力。参考：[Stats](https://docs.meowtils.dev/modules/hypixel/stats/)。
- 队友、机器人或好友没有触发某项提示时，检查 Teams 的排除条件。识别依据随服务器环境变化，并非百分之百准确。参考：[Teams](https://docs.meowtils.dev/modules/meowtils/teams/)。
- PartyNotifier 负责转发提醒；产生提醒的功能仍需单独启用。参考：[PartyNotifier](https://docs.meowtils.dev/modules/hypixel/partynotifier/)。

## 三种个人名单的区别

| 名单 | 主要用途 | 原文 |
| --- | --- | --- |
| Blacklist | 保存需留意的玩家及记录原因，可在再次相遇时提醒 | [黑名单](https://docs.meowtils.dev/other/lists/blacklist/) |
| Safelist | 标记自己认为威胁较低的玩家，可与 AutoSafelist 联动 | [安全名单](https://docs.meowtils.dev/other/lists/safelist/) |
| Friends | 管理好友，并允许 Teams 让相关模块忽略好友 | [好友名单](https://docs.meowtils.dev/other/lists/friends/) |

这些是个人记录，不是官方封禁或信誉认证。整理建议：遇到异常提示时，先核对原始场景，再决定是否长期保留记录。
