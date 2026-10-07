import type { UserSubjectCollection } from "@/types/bangumi";

export interface BangumiPagination {
	limit: number;
	delay: number;
	maxTotal: number;
}

export async function fetchBangumiCollections(
	apiUrl: string,
	username: string,
	subjectType: number,
	pagination: BangumiPagination,
	headers: Record<string, string> = {},
): Promise<UserSubjectCollection[]> {
	const limit = Math.min(100, Math.max(1, pagination.limit));
	const items = new Map<number, UserSubjectCollection>();
	let offset = 0;
	while (true) {
		const params = new URLSearchParams({
			subject_type: String(subjectType),
			limit: String(limit),
			offset: String(offset),
		});
		const response = await fetch(
			`${apiUrl.replace(/\/$/, "")}/v0/users/${encodeURIComponent(username)}/collections?${params}`,
			{
				headers: { Accept: "application/json", ...headers },
				signal: AbortSignal.timeout(10_000),
			},
		);
		if (!response.ok) throw new Error(`Bangumi HTTP ${response.status}`);
		const result = await response.json();
		if (!Array.isArray(result.data) || !Number.isFinite(result.total))
			throw new Error("Invalid Bangumi response");
		for (const item of result.data) {
			if (!Number.isFinite(item.subject_id) || !item.subject)
				throw new Error("Invalid Bangumi collection");
			items.set(item.subject_id, item);
		}
		offset += result.data.length;
		if (pagination.maxTotal > 0 && offset >= pagination.maxTotal) break;
		if (result.data.length < limit || offset >= result.total) break;
		if (pagination.delay > 0)
			await new Promise((resolve) => setTimeout(resolve, pagination.delay));
	}
	return [...items.values()].slice(
		0,
		pagination.maxTotal > 0 ? pagination.maxTotal : undefined,
	);
}
