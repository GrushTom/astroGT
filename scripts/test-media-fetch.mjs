import assert from "node:assert/strict";
import test from "node:test";
import { BilibiliFetchError, fetchBilibiliList } from "../src/utils/bilibili-utils.ts";
import { fetchBangumiCollections } from "../src/utils/bangumi-utils.ts";

const json = (value) => Response.json(value);
const anime = (id) => ({ media_id: id, season_id: id + 1000, title: `Title ${id}`, cover: "http://example.com/cover.jpg" });
const collection = (id) => ({ subject_id: id, subject: { id, name: `Title ${id}` } });

test("Bilibili private lists produce an actionable error, not empty collections", async (t) => {
	t.mock.method(globalThis, "fetch", async () => json({ code: 53013, message: "private" }));
	await assert.rejects(fetchBilibiliList("123"), (error) => error instanceof BilibiliFetchError && error.code === 53013);
});

test("Bilibili HTTP failures are distinct from an empty account", async (t) => {
	t.mock.method(globalThis, "fetch", async () => new Response("blocked", { status: 412 }));
	await assert.rejects(fetchBilibiliList("123"), (error) => error.code === 412);
});

test("Bilibili combines all pages and both types, with headers and no duplicate keys", async (t) => {
	t.mock.method(globalThis, "fetch", async (url, options) => {
		assert.ok(options.headers["User-Agent"]);
		assert.equal(options.headers.Referer, "https://space.bilibili.com/123/");
		const params = new URL(url).searchParams;
		const list = params.get("type") === "2" ? [anime(31), anime(32)] : params.get("pn") === "1" ? Array.from({ length: 30 }, (_, i) => anime(i + 1)) : [anime(31)];
		return json({ code: 0, data: { total: params.get("type") === "2" ? 2 : 31, list } });
	});
	const result = await fetchBilibiliList("123");
	assert.equal(result.length, 32);
	assert.equal(result[0].poster, "https://example.com/cover.jpg");
	assert.equal(result[31].link, "https://www.bilibili.com/bangumi/play/ss1032");
});

test("Bilibili later-page failure cannot silently truncate the list", async (t) => {
	t.mock.method(globalThis, "fetch", async (url) => {
		const params = new URL(url).searchParams;
		if (params.get("type") === "2") return json({ code: 0, data: { total: 0, list: [] } });
		if (params.get("pn") === "2") return json({ code: -352, message: "temporarily blocked" });
		return json({ code: 0, data: { total: 31, list: Array.from({ length: 30 }, (_, i) => anime(i)) } });
	});
	await assert.rejects(fetchBilibiliList("123"), (error) => error.code === -352);
});

test("Bangumi paginates, encodes usernames and honors maximum count", async (t) => {
	const offsets = [];
	t.mock.method(globalThis, "fetch", async (url) => {
		assert.ok(url.includes("/users/a%2Fb/collections?"));
		const offset = Number(new URL(url).searchParams.get("offset"));
		offsets.push(offset);
		return json({ total: 8, data: [collection(offset + 1), collection(offset + 2)] });
	});
	const items = await fetchBangumiCollections("https://api.bgm.tv/", "a/b", 2, { limit: 2, maxTotal: 3, delay: 0 });
	assert.deepEqual(items.map((item) => item.subject_id), [1, 2, 3]);
	assert.deepEqual(offsets, [0, 2]);
});

test("Bangumi rejects invalid success responses instead of erasing a snapshot", async (t) => {
	t.mock.method(globalThis, "fetch", async () => json({ error: "upstream failed" }));
	await assert.rejects(fetchBangumiCollections("https://api.bgm.tv", "123", 2, { limit: 50, maxTotal: 1000, delay: 0 }), /Invalid Bangumi response/);
});

test("Bangumi accepts a genuinely empty list", async (t) => {
	t.mock.method(globalThis, "fetch", async () => json({ total: 0, data: [] }));
	assert.deepEqual(await fetchBangumiCollections("https://api.bgm.tv", "123", 2, { limit: 50, maxTotal: 1000, delay: 0 }), []);
});
