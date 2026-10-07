import type { StandardizedAnime } from "@/types/bilibili";

export interface BilibiliItem {
	media_id: number;
	title: string;
	cover?: string;
	season_type?: number;
	season_type_name?: string;
	rating?: { score?: number };
	evaluate?: string;
	brief?: string;
	season_id: number;
	new_ep?: { index_show?: string };
}

const BILIBILI_API = "https://api.bilibili.com/x/space/bangumi/follow/list";
const PAGE_SIZE = 30;

export class BilibiliFetchError extends Error {
	constructor(
		public readonly code: number,
		message: string,
	) {
		super(message);
		this.name = "BilibiliFetchError";
	}
}

async function fetchPage(
	uid: string,
	type: number,
	page: number,
): Promise<{ list: BilibiliItem[]; total: number }> {
	const params = new URLSearchParams({
		type: String(type),
		vmid: uid,
		pn: String(page),
		ps: String(PAGE_SIZE),
	});
	const response = await fetch(`${BILIBILI_API}?${params}`, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
			Referer: `https://space.bilibili.com/${encodeURIComponent(uid)}/`,
			Accept: "application/json",
		},
		signal: AbortSignal.timeout(15_000),
	});
	if (!response.ok)
		throw new BilibiliFetchError(
			response.status,
			`Bilibili HTTP ${response.status}`,
		);
	const result = await response.json();
	if (result.code !== 0)
		throw new BilibiliFetchError(
			result.code,
			result.message || "Bilibili API error",
		);
	if (
		!Array.isArray(result.data?.list) ||
		!Number.isFinite(result.data?.total)
	) {
		throw new BilibiliFetchError(-1, "Invalid Bilibili response");
	}
	return result.data;
}

/** 获取指定类型的全部追番数据 */
async function fetchBilibiliByType(
	uid: string,
	type: number,
): Promise<BilibiliItem[]> {
	const items: BilibiliItem[] = [];
	const first = await fetchPage(uid, type, 1);
	items.push(...first.list);
	const total = first.total;
	const totalPages = Math.ceil(total / PAGE_SIZE);
	// 顺序分页，避免大量并发；分页失败不能伪装成完整列表。
	for (let page = 2; page <= totalPages; page++) {
		const batch = await fetchPage(uid, type, page);
		items.push(...batch.list);
	}
	return items;
}

/** 获取 Bilibili 追番（type=1）+ 追剧（type=2）并标准化 */
export async function fetchBilibiliList(
	uid: string,
): Promise<StandardizedAnime[]> {
	const [animeItems, dramaItems] = await Promise.all([
		fetchBilibiliByType(uid, 1),
		fetchBilibiliByType(uid, 2),
	]);
	console.log(
		`[Bilibili] Fetched ${animeItems.length + dramaItems.length} items (anime: ${animeItems.length}, drama: ${dramaItems.length}).`,
	);

	const unique = new Map(
		[...animeItems, ...dramaItems].map((item) => [item.media_id, item]),
	);
	return [...unique.values()].map((item) => ({
		id: item.media_id,
		title: item.title,
		originalTitle: item.title,
		poster: item.cover ? item.cover.replace("http://", "https://") : null,
		// season_type: 1=番剧, 2=电影, 3=纪录片, 4=国创, 5=电视剧
		type: item.season_type === 2 ? ("movie" as const) : ("tv" as const),
		season_type: item.season_type || 1,
		rating: item.rating?.score || 0,
		date: "",
		overview: item.evaluate || item.brief || "",
		link: `https://www.bilibili.com/bangumi/play/ss${item.season_id}`,
		epStatus: item.new_ep?.index_show || "",
	}));
}
