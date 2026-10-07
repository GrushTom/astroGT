import assert from "node:assert/strict";
import test from "node:test";
import worker, { PresenceState } from "./worker.mjs";

function fixture() {
	const store = new Map();
	const object = new PresenceState({ storage: { get: async (k) => store.get(k), put: async (k, v) => store.set(k, v) } });
	const env = { PRESENCE_TOKEN: "test-only-".repeat(4), PRESENCE: { idFromName: (n) => n, get: () => object } };
	const read = () => worker.fetch(new Request("https://test/status"), env);
	const post = (payload, token = env.PRESENCE_TOKEN) => worker.fetch(new Request("https://test/status", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) }), env);
	return { store, env, read, post };
}

test("unauthorized writes cannot change public status", async () => {
	const { post, read } = fixture();
	assert.equal((await post({ state: "online" }, "wrong")).status, 401);
	assert.equal((await (await read()).json()).state, "offline");
});
test("only public fields survive; server timestamp overrides input", async () => {
	const { post, read } = fixture();
	assert.equal((await post({ state: "online", activity: "写代码", windowTitle: "private.txt", updatedAt: 1, music: { title: "Song", artist: "Artist", playing: true, token: "private" } })).status, 200);
	const response = await read();
	const data = await response.json();
	assert.equal(data.activity, "写代码");
	assert.equal(data.windowTitle, undefined);
	assert.equal(data.music.token, undefined);
	assert.ok(data.updatedAt > 1);
	assert.equal(data.expiresAt - data.updatedAt, 90_000);
	assert.equal(response.headers.get("Cache-Control"), "no-store");
	assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
});
test("expired and explicit offline clear old music and activity", async () => {
	const { post, read, store } = fixture();
	await post({ state: "online", activity: "Coding", music: { title: "Song", artist: "Artist", playing: true } });
	store.get("status").expiresAt = Date.now() - 1;
	let data = await (await read()).json();
	assert.equal(data.state, "offline");
	assert.equal(data.music, null);
	assert.equal(data.activity, null);
	await post({ state: "offline" });
	data = await (await read()).json();
	assert.equal(data.state, "offline");
	assert.equal(data.expiresAt, null);
});
test("away hides activity; pause is preserved", async () => {
	const { post, read } = fixture();
	await post({ state: "away", activity: "private", music: { title: "Song", artist: "", playing: false } });
	const data = await (await read()).json();
	assert.equal(data.activity, null);
	assert.equal(data.music.playing, false);
});
test("invalid and oversized payloads are rejected without replacing status", async () => {
	const { post, read } = fixture();
	for (const payload of [null, { state: "bad" }, { state: "online", activity: 42 }, { state: "online", music: { title: "x", artist: "y", playing: "true" } }, { state: "online", extra: "x".repeat(5000) }]) {
		assert.equal((await post(payload)).status, 400);
	}
	assert.equal((await (await read()).json()).state, "offline");
});
test("an unconfigured writer refuses writes and still serves reads", async () => {
	const { env, read } = fixture();
	const response = await worker.fetch(new Request("https://test/status", { method: "POST", headers: { Authorization: "Bearer anything", "Content-Type": "application/json" }, body: JSON.stringify({ state: "online" }) }), { ...env, PRESENCE_TOKEN: undefined });
	assert.equal(response.status, 503);
	assert.equal((await (await read()).json()).state, "offline");
});
test("only GET and POST reach the status endpoint", async () => {
	const { env } = fixture();
	assert.equal((await worker.fetch(new Request("https://test/status", { method: "PUT" }), env)).status, 405);
	assert.equal((await worker.fetch(new Request("https://test/other"), env)).status, 404);
});
test("a non-JSON content type is rejected", async () => {
	const { env } = fixture();
	const response = await worker.fetch(new Request("https://test/status", { method: "POST", headers: { Authorization: `Bearer ${env.PRESENCE_TOKEN}`, "Content-Type": "text/plain" }, body: "state=online" }), env);
	assert.equal(response.status, 415);
});
