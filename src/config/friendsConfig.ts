import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";
import { loadFriendsFromJson, sortFriendsByName } from "../utils/friends-utils";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
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
