import type { PresenceConfig } from "@/types/presenceConfig";

export const presenceConfig: PresenceConfig = {
	enable: true,
	// 独立状态 Worker 的完整 /status 地址；留空时不显示控件。
	// 这里只填写公开读取地址，不要填写上报密钥。
	endpoint:
		import.meta.env?.PUBLIC_PRESENCE_ENDPOINT ||
		"https://firefly-presence.2114223063.workers.dev/status",
	pollInterval: 15_000,
};
