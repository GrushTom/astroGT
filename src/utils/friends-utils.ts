import fs from 'fs';
import path from 'path';
import type { FriendLink } from '../types/config';

// JSON友链数据结构
interface JsonFriendLink {
  name: string;
  avatar: string;
  description: string;
  url: string;
}

/**
 * 从JSON文件加载友链数据
 * @returns 加载的友链数据数组
 */
export const loadFriendsFromJson = (): FriendLink[] => {
  const friendsDir = path.join(process.cwd(), 'src', 'data', 'friends');
  const friends: FriendLink[] = [];

  try {
    // 检查目录是否存在
    if (!fs.existsSync(friendsDir)) {
      console.warn('Friends directory does not exist:', friendsDir);
      return [];
    }

    // 读取目录中的所有文件
    const files = fs.readdirSync(friendsDir);

    // 过滤出JSON文件并处理
    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(friendsDir, file);
        try {
          // 读取文件内容
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          // 解析JSON
          const jsonData = JSON.parse(fileContent) as JsonFriendLink;

          // 验证必要字段
          if (!jsonData.name || !jsonData.avatar || !jsonData.description || !jsonData.url) {
            console.warn(`Missing required fields in ${file}`);
            return;
          }

          // 映射到FriendLink类型并添加默认值
          const friendLink: FriendLink = {
            title: jsonData.name,
            imgurl: jsonData.avatar,
            desc: jsonData.description,
            siteurl: jsonData.url,
            tags: [], // 默认空数组
            weight: 0, // 默认权重
            enabled: true, // 默认启用
          };

          friends.push(friendLink);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    });
  } catch (error) {
    console.error('Error loading friends from JSON:', error);
  }

  return friends;
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
