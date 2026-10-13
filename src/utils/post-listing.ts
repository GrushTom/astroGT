type SeriesPost = {
	id: string;
	data: {
		series: string;
		seriesOrder?: number;
		published: Date;
		title: string;
		tags: string[];
		category?: string | null;
	};
};

export function sortBySeriesOrder(a: SeriesPost, b: SeriesPost): number {
	const ao = a.data.seriesOrder;
	const bo = b.data.seriesOrder;
	if (ao !== undefined && bo !== undefined && ao !== bo) return ao - bo;
	if (ao === undefined && bo !== undefined) return 1;
	if (ao !== undefined && bo === undefined) return -1;
	return (
		b.data.published.getTime() - a.data.published.getTime() ||
		a.data.title.localeCompare(b.data.title) ||
		a.id.localeCompare(b.id)
	);
}

/** Call after visibility filtering. Never modify the complete collection. */
export function collapseSeries<T extends SeriesPost>(
	posts: T[],
): (T & { listingCategories: string[] })[] {
	const groups = new Map<string, T[]>();
	for (const post of posts) {
		const series = post.data.series.trim();
		if (!series) continue;
		const group = groups.get(series) || [];
		group.push(post);
		groups.set(series, group);
	}
	for (const group of groups.values()) group.sort(sortBySeriesOrder);
	return posts.flatMap((post) => {
		const group = groups.get(post.data.series.trim()) || [post];
		if (group[0].id !== post.id) return [];
		return [
			{
				...post,
				data: {
					...post.data,
					tags: [...new Set(group.flatMap((p) => p.data.tags))],
				},
				listingCategories: [
					...new Set(group.map((p) => p.data.category?.trim() || "")),
				],
			},
		];
	});
}
