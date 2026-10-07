<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import type { PresenceStatus } from "@/types/presenceConfig";

const {
	endpoint,
	pollInterval = 15_000,
}: {
	endpoint: string;
	pollInterval?: number;
} = $props();

let status = $state<PresenceStatus | null>(null);
let failed = $state(false);
let now = $state(Date.now());
const expired = $derived(!status?.expiresAt || now >= status.expiresAt);
const state = $derived(expired ? "offline" : (status?.state ?? "offline"));
const label = $derived(
	failed
		? i18n(I18nKey.presenceUnavailable)
		: !status
			? i18n(I18nKey.presenceConnecting)
			: state === "online"
				? i18n(I18nKey.presenceOnline)
				: state === "away"
					? i18n(I18nKey.presenceAway)
					: i18n(I18nKey.presenceOffline),
);
const age = $derived(
	status?.updatedAt
		? Math.max(0, Math.floor((now - status.updatedAt) / 1000))
		: null,
);
const updated = $derived(
	age === null
		? null
		: age < 60
			? i18n(I18nKey.presenceUpdatedJustNow)
			: age < 3600
				? i18n(I18nKey.presenceUpdatedMinutesAgo).replace(
						"{minutes}",
						String(Math.floor(age / 60)),
					)
				: i18n(I18nKey.presenceUpdatedLongAgo),
);

onMount(() => {
	let disposed = false;
	let busy = false;
	let controller: AbortController | undefined;
	async function refresh() {
		if (busy || disposed || document.hidden) return;
		busy = true;
		controller = new AbortController();
		const timeout = window.setTimeout(() => controller?.abort(), 8000);
		try {
			const response = await fetch(endpoint, {
				cache: "no-store",
				credentials: "omit",
				signal: controller.signal,
			});
			if (!response.ok) throw new Error("Status unavailable");
			const data = await response.json();
			if (
				!["online", "away", "offline"].includes(data.state) ||
				(data.updatedAt !== null && !Number.isFinite(data.updatedAt)) ||
				(data.expiresAt !== null && !Number.isFinite(data.expiresAt)) ||
				(data.activity !== null && typeof data.activity !== "string") ||
				(data.music !== null &&
					(typeof data.music?.title !== "string" ||
						typeof data.music?.artist !== "string" ||
						typeof data.music?.playing !== "boolean"))
			) {
				throw new Error("Invalid status");
			}
			if (!disposed) {
				status = data;
				failed = false;
				now = Date.now();
			}
		} catch {
			if (!disposed) {
				failed = true;
				status = null;
			}
		} finally {
			window.clearTimeout(timeout);
			busy = false;
		}
	}
	void refresh();
	const poll = window.setInterval(
		() => void refresh(),
		Math.max(5000, pollInterval),
	);
	const tick = window.setInterval(() => {
		now = Date.now();
	}, 1000);
	const visible = () => {
		now = Date.now();
		void refresh();
	};
	document.addEventListener("visibilitychange", visible);
	return () => {
		disposed = true;
		controller?.abort();
		window.clearInterval(poll);
		window.clearInterval(tick);
		document.removeEventListener("visibilitychange", visible);
	};
});
</script>

<div class="presence text-neutral-700 dark:text-neutral-200">
	<div class="status" role="status"><span class="dot" class:online={!failed && !!status && state === "online"} class:away={!failed && state === "away"}></span>{label}<span class="device">Windows</span></div>
	{#if !failed && status && state !== "offline"}
		<p class="activity">{state === "away" ? i18n(I18nKey.presenceAwayMessage) : status.activity || i18n(I18nKey.presenceDefaultActivity)}</p>
		{#if status.music}
			<div class="music"><span class="note" aria-hidden="true">♫</span><div class="track"><span class="caption">{status.music.playing ? i18n(I18nKey.presenceMusicPlaying) : i18n(I18nKey.presenceMusicPaused)}</span><p class="title">{status.music.title}</p><p class="artist">{status.music.artist || i18n(I18nKey.presenceUnknownArtist)}</p></div></div>
		{/if}
	{:else if !failed && status}
		<p class="activity">{i18n(I18nKey.presenceOfflineMessage)}</p>
	{/if}
	{#if updated !== null}<p class="updated">{updated}</p>{/if}
</div>

<style>
.presence { font-size: .875rem; padding: .25rem 0; }
.status { display: flex; align-items: center; gap: .5rem; font-weight: 600; }
.dot { width: .5rem; height: .5rem; border-radius: 50%; background: #94a3b8; }
.online { background: #22c55e; box-shadow: 0 0 0 3px #22c55e20; }
.away { background: #f59e0b; }
.device { margin-left: auto; opacity: .5; font-size: .7rem; font-weight: 400; }
.activity { margin-top: .75rem; overflow-wrap: anywhere; }
.music { display: flex; gap: .75rem; margin-top: .9rem; padding: .75rem; border-radius: .75rem; background: var(--btn-regular-bg); }
.note { color: var(--primary); font-size: 1.75rem; }
.track { min-width: 0; }
.caption, .artist, .updated { font-size: .7rem; opacity: .6; }
.title { font-weight: 600; margin: .2rem 0; overflow-wrap: anywhere; }
.artist { overflow-wrap: anywhere; }
.updated { margin-top: .75rem; }
</style>
