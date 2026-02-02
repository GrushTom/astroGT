import type { FriendLink, FriendsPageConfig } from "../types/config";
import { loadFriendsFromJson, sortFriendsByName } from "../utils/friends-utils";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 显示列数：2列或3列
	columns: 2,
};

// 空友链配置，所有友链通过JSON文件添加
export const friendsConfig: FriendLink[] = [];

// 获取启用的友链并按名称A-Z排序
export const getEnabledFriends = (): FriendLink[] => {
	// 从JSON文件加载友链
	const jsonFriends = loadFriendsFromJson();
	// 按名称A-Z排序
	return sortFriendsByName(jsonFriends);
};
