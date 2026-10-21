---
title: eMudhra 证书事件：浏览器自测与简要处理指南
published: 2026-10-22
description: 遇到 eMudhra 证书检测红色提示时，如何更新、复测并判断结果，附原始检测网站与事件报告。
image: ''
tags:
- 网络安全
- 浏览器
- HTTPS
category: 技术教程
draft: false
lang: zh-CN
sourceLink: https://emudhra.we-have-a-problem.com/
---

**先更新浏览器和操作系统，重启后再检测；遇到证书警告，不要强行继续访问。** 本文结合 `docs/CA.md` 中的提醒与公开资料整理，核对日期为 **2026 年 10 月 22 日**。

## 发生了什么

CA 证书用于帮助客户端验证网站身份。此次 eMudhra 的 8 个中间 CA 私钥因生成缺陷被恢复，其中 6 个用于 TLS、2 个用于代码签名。Mozilla 的调查指出，受影响的 P-384 私钥取值小于 256，远低于正常密钥空间。这是特定 CA 的密钥生成问题，不是 HTTPS 算法整体被破解。[查看原始事件报告](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c5)

攻击者可能利用这些私钥伪造证书；能否实施攻击还取决于客户端是否信任相关证书链，以及网络位置等条件。因此，不能把事件直接理解为“所有人的历史流量都已被解密”。

## 普通用户怎么处理

1. **更新并重启。** 通过浏览器自带更新入口及系统更新安装可用更新，完成后彻底退出并重新打开浏览器。不要只根据版本号判断：证书阻止规则也可能单独推送。
2. **在实际使用的浏览器里自测。** 打开 [原网站检测入口](https://emudhra.we-have-a-problem.com/#check)，点击 **Run check**，等待所有项目完成。手机浏览器、应用内浏览器需要分别确认，不能拿电脑上的结果代替。
3. **按结果处理。** 有红色项时，先停止在该环境进行支付、输入重要密码等操作；更新后复测。仍为红色则暂换已更新、复测未显示异常的浏览器，受单位管理的设备联系 IT。
4. **不要绕过证书错误。** 日常访问出现证书被撤销、过期或不受信任提示时，先停止访问并核实；不要通过关闭证书校验来“修复”。

更新建议及各平台进展见[原网站说明](https://emudhra.we-have-a-problem.com/)。

## 检测结果怎么看

| 结果 | 含义与处理 |
| --- | --- |
| 红色，连接成功 | 测试连接未被阻止，应更新并排查；不代表已确认遭到攻击。 |
| 绿色，Did not connect | 未能建立测试连接，可能是证书被拒绝，也可能是网络或拦截因素；不能单独当作安全证明。 |
| 超时或结果不确定 | 无法判断，待网络正常后重测，不要按“通过”处理。 |

网页检测脚本无法区分部分网络错误与 TLS 错误，因此“全绿”也不代表设备中所有应用都已修复。[检测实现与源码](https://github.com/galadran/we-have-a-problem.com)

![SnowShot_2026-10-22_02-58-54.png](https://img.grushtom.com/file/1792605598948_SnowShot_2026-10-22_02-58-54.png)
## 开发者还需要检查什么

浏览器检测不能覆盖命令行工具、运行时或容器。使用 curl、Python、Node.js 等工具时，还应更新其实际使用的运行时与 CA 信任库，参照原站的软件修复列表核对。普通用户优先使用厂商更新；涉及手动修改系统证书库的措施，交由了解设备配置的管理员处理。

## 原网站与资料来源

- **原网站：** [eMudhra Intermediate CA Compromise](https://emudhra.we-have-a-problem.com/)，页面标注发布于 2026 年 10 月 20 日，由 Dennis Jackson 发布，提供事件说明、自测与修复进展。
- **直接自测：** [Does your client still trust the compromised intermediates?](https://emudhra.we-have-a-problem.com/#check)
- **原始报告：** [Mozilla Bugzilla #2083449](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449)
- **整理材料：** 项目内 `docs/CA.md` 的提醒笔记；本文保留其处理重点，并依据原始资料校正表述。后续变化以原站和各软件厂商公告为准。
