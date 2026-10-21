# 开往申请复核说明

修复：`src/config/navBarConfig.ts` 中的开往地址从 `https://www.travellings.cn/train.html` 改为 `https://www.travellings.cn/go.html`。

检测器的严格模式未将 `train.html` 列入认可地址，因此页面即使返回 HTTP 200，也会被判断为 LOST，且 failedReason 保持 null。

参考源码：https://github.com/travellings-link/travellings-bot/blob/main/src/utils/checkPageContent.ts
原申请：https://github.com/travellings-link/travellings/issues/4038

## 提交前

1. 将本次导航配置修改部署到 https://blog.grushtom.com/。
2. 查看线上首页源代码，确认桌面导航和移动菜单的开往链接均为 `https://www.travellings.cn/go.html`。
3. 原 issue 尚未关闭，可先添加下方复核说明，避免重复申请。编辑或重新打开 issue 不会触发当前的自动检测工作流；若维护者要求重新申请，再创建新 issue 并关联 #4038。

## 部署完成后可粘贴的复核说明

此前自动检查返回 LOST 的原因已定位：顶部“开往”入口使用了 `https://www.travellings.cn/train.html`，未匹配巡查机器人的认可链接列表。现已将桌面导航与移动菜单入口改为 `https://www.travellings.cn/go.html` 并部署。

站点地址：https://blog.grushtom.com/
徽标位置：桌面端顶部导航“开往”；移动端导航菜单“开往”。

使用官方 checkPageContent 严格检测函数复现，旧链接不通过，修改后的页面内容通过。此前的 LOST 并非 HTTP 请求失败。烦请协助复核原申请 #4038，谢谢。
