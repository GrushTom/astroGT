import type { FriendLink } from "../types/friendsConfig";

interface JsonFriendLink {
	name: string;
	avatar: string;
	description: string;
	url: string;
}

// 在页面构建时读取 JSON，避免将 Node 文件系统依赖带入浏览器。
export const loadFriendsFromJson = (): FriendLink[] => {
	const files = import.meta.glob<JsonFriendLink>("../data/friends/*.json", {
		eager: true,
		import: "default",
	});
	return Object.entries(files).flatMap(([file, data]) => {
		if (!data.name || !data.avatar || !data.description || !data.url) {
			console.warn(`Missing required fields in ${file}`);
			return [];
		}
		return [
			{
				title: data.name,
				imgurl: data.avatar,
				desc: data.description,
				siteurl: data.url,
				tags: [],
				weight: 0,
				enabled: true,
			},
		];
	});
};

/**
 * 按名称A-Z排序友链数据
 * @param friends 友链数据数组
 * @returns 排序后的友链数据数组
 */
export const sortFriendsByName = (friends: FriendLink[]): FriendLink[] => {
	return friends.sort((a, b) => {
		const nameA = a.title.toLowerCase();
		const nameB = b.title.toLowerCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
};

/**
 * 加载并排序友链数据
 * @returns 排序后的友链数据数组
 */
export const loadAndSortFriends = (): FriendLink[] => {
	const friends = loadFriendsFromJson();
	return sortFriendsByName(friends);
};
