import type { SponsorConfig } from "../types/sponsorConfig";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 打赏用途说明
	usage:
		"您的打赏将用于服务器维护、内容创作和功能开发，帮助我持续提供优质内容。",

	// 是否显示打赏者列表
	showSponsorsList: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示打赏按钮
	showButtonInPost: true,

	// 赞助列表下方的留言
	footerMessage:
		"如果您已赞助，并且想加入赞助名单，请<a href='https://github.com/GrushTom/astroGT/tree/master/src/data/sponsors' target='_blank' rel='noopener noreferrer' class='text-[var(--primary)] hover:underline'>点击这里提交</a>。",

	// 赞助方式列表
	methods: [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			// 收款码图片路径（需要放在 public 目录下）
			qrCode: "https://img.grushtom.com/file/1768290389058_alipay.png",
			link: "",
			description: "使用 支付宝 扫码打赏",
			enabled: true,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			qrCode: "https://img.grushtom.com/file/1768289147153_wechat.png",
			link: "",
			description: "使用 微信 扫码打赏",
			enabled: true,
		},
		{
			name: "bilibili",
			icon: "simple-icons:bilibili",
			qrCode: "",
			link: "https://space.bilibili.com/306384186",
			description: "关注 GrushTom 的 bilibili 账号",
			enabled: true,
		},
		{
			name: "爱发电",
			icon: "simple-icons:afdian",
			qrCode: "",
			link: "https://afdian.com/a/GrushTom",
			description: "通过 爱发电 进行赞助",
			enabled: true,
		},
	],

	// 额外赞助者；JSON 名单由赞助页面自动加载。
	sponsors: [],
};
