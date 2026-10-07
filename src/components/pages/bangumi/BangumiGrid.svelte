<script lang="ts">
import { onMount, untrack } from "svelte";
import GridSkeleton from "@/components/common/GridSkeleton.svelte";
import TabNav from "@/components/common/TabNav.svelte";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import type { UserSubjectCollection } from "@/types/bangumi";
import type { NsfwMode } from "@/types/nsfw";
import { fetchBangumiCollections } from "@/utils/bangumi-utils";
import { filterNsfw, isBangumiNsfw } from "@/utils/nsfw-utils";
import BangumiSection from "./BangumiSection.svelte";

interface Props {
	// 静态模式：直接传入数据
	tabs?: Array<{ id: string; name: string; count: number }>;
	initialActiveTab?: string;
	bangumiData?: Record<string, UserSubjectCollection[]>;
	subjectBaseUrl?: string;
	// 动态模式：传入获取配置
	fetchConfig?: {
		username: string;
		apiUrl: string;
		categories: Record<string, boolean>;
		categoryOrder: string[];
		pagination: { limit: number; delay: number; maxTotal: number };
		nsfw?: NsfwMode;
	};
	nsfw?: NsfwMode; // NSFW 处理："off" | "blur" | "hide"
}

const {
	tabs: staticTabs,
	initialActiveTab,
	bangumiData: staticData,
	subjectBaseUrl,
	fetchConfig,
	nsfw,
}: Props = $props();

const nsfwMode = $derived(nsfw ?? fetchConfig?.nsfw ?? "off");

const isDynamic = $derived(!!fetchConfig);

// 状态
let activeTab = $state(
	untrack(() => initialActiveTab || staticTabs?.[0]?.id || ""),
);
let fetchLoading = $state(false);
const loading = $derived(isDynamic && fetchLoading);
let error = $state(false);

let refreshFailed = $state(false);
let errorTitle = $state("");
let errorDesc = $state("");
let updateTimestamp = $state("");

// 动态模式的数据
let dynamicTabs = $state<Array<{ id: string; name: string; count: number }>>(
	untrack(() => staticTabs || []),
);
let dynamicData = $state<Record<string, UserSubjectCollection[]>>(
	untrack(() => staticData || {}),
);

// 合并后的数据
const tabs = $derived(isDynamic ? dynamicTabs : staticTabs || []);
const bangumiData = $derived(isDynamic ? dynamicData : staticData || {});

const categoryMap: Record<string, { name: string; subjectType: number }> = {
	book: { name: i18n(I18nKey.bangumiCategoryBook), subjectType: 1 },
	anime: { name: i18n(I18nKey.bangumiCategoryAnime), subjectType: 2 },
	music: { name: i18n(I18nKey.bangumiCategoryMusic), subjectType: 3 },
	game: { name: i18n(I18nKey.bangumiCategoryGame), subjectType: 4 },
	real: { name: i18n(I18nKey.bangumiCategoryReal), subjectType: 6 },
};

function handleTabChange(tabId: string) {
	activeTab = tabId;
}

async function loadDynamicData() {
	if (!fetchConfig || fetchLoading) return;
	fetchLoading = true;
	error = false;
	refreshFailed = false;
	const { username, apiUrl, categories, categoryOrder, pagination } =
		fetchConfig;

	const enabled: string[] = [];
	for (const [k, v] of Object.entries(categories)) {
		if (v) enabled.push(k);
	}
	if (categoryOrder.length > 0) {
		enabled.sort((a, b) => {
			const ai = categoryOrder.indexOf(a);
			const bi = categoryOrder.indexOf(b);
			if (ai === -1 && bi === -1) return 0;
			if (ai === -1) return 1;
			if (bi === -1) return -1;
			return ai - bi;
		});
	}

	const newTabs: Array<{ id: string; name: string; count: number }> = [];
	const newData: Record<string, UserSubjectCollection[]> = {};

	for (const catKey of enabled) {
		const info = categoryMap[catKey];
		if (!info) continue;
		try {
			const data = await fetchBangumiCollections(
				apiUrl,
				username,
				info.subjectType,
				pagination,
			);
			// NSFW 拦截：hide 模式下过滤掉 NSFW 条目，保持标签页计数一致
			const filtered = filterNsfw(data, nsfwMode, isBangumiNsfw);
			newData[catKey] = filtered;
			newTabs.push({ id: catKey, name: info.name, count: filtered.length });
		} catch (e) {
			console.error(`[Bangumi] Failed to fetch ${catKey} data:`, e);
			refreshFailed = true;
			if (Object.hasOwn(dynamicData, catKey)) {
				newData[catKey] = dynamicData[catKey];
				newTabs.push({
					id: catKey,
					name: info.name,
					count: dynamicData[catKey].length,
				});
			}
		}
	}

	if (newTabs.length === 0 || newTabs.every((t) => t.count === 0)) {
		fetchLoading = false;
		error = true;
		errorTitle = i18n(
			refreshFailed ? I18nKey.bangumiFetchError : I18nKey.bangumiNoData,
		);
		errorDesc = i18n(
			refreshFailed
				? I18nKey.bangumiRefreshFailed
				: I18nKey.bangumiNoDataDescription,
		);
		dynamicTabs = newTabs;
		dynamicData = newData;
		return;
	}

	dynamicTabs = newTabs;
	dynamicData = newData;
	if (!newTabs.some((tab) => tab.id === activeTab && tab.count > 0)) {
		activeTab = newTabs.find((tab) => tab.count > 0)?.id || newTabs[0].id;
	}
	fetchLoading = false;

	const now = new Date();
	const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
	updateTimestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

// 从 URL hash 恢复 tab
function restoreTabFromHash() {
	if (!isDynamic) {
		const hash = window.location.hash.replace(/^#/, "");
		if (hash) {
			try {
				const decoded = decodeURIComponent(hash);
				if (tabs.some((t) => t.id === decoded)) {
					activeTab = decoded;
				}
			} catch {}
		}
	}
}

onMount(async () => {
	restoreTabFromHash();
	if (isDynamic) {
		await loadDynamicData();
	}
});
</script>

{#if refreshFailed && tabs.some((tab) => tab.count > 0)}
  <p class="mb-4 text-sm text-neutral-500" role="status">{i18n(I18nKey.bangumiRefreshFailed)}</p>
{/if}

{#if isDynamic && loading && tabs.length === 0}
  <GridSkeleton />
{:else if isDynamic && error}
  <div class="text-center py-16">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-(--btn-regular-bg) rounded-full mb-6 border border-(--line-divider)">
      <span class="text-[2rem] text-red-500">⚠</span>
    </div>
    <h2 class="text-xl font-semibold text-black/80 dark:text-white/80 mb-3">{errorTitle}</h2>
    <p class="text-black/60 dark:text-white/60 mb-4 max-w-md mx-auto">{errorDesc}</p>
  </div>
{:else if tabs.length > 0}
  <TabNav {tabs} {activeTab} onTabChange={handleTabChange} />

  {#each tabs as tab (tab.id)}
    <BangumiSection
      sectionId={tab.id}
      items={bangumiData[tab.id] || []}
      isActive={tab.id === activeTab}
      itemsPerPage={24}
      {subjectBaseUrl}
      nsfw={nsfwMode}
    />
  {/each}
{/if}
