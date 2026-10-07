const TTL = 90_000;
const MAX_BODY = 4096;
const headers = {
	"Access-Control-Allow-Origin": "*",
	"Cache-Control": "no-store",
	"Content-Type": "application/json; charset=utf-8",
	"X-Content-Type-Options": "nosniff",
};
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
const offline = (updatedAt = null) => ({ state: "offline", activity: null, music: null, updatedAt, expiresAt: null });

function cleanText(value, max) {
	if (typeof value !== "string" || value.length > max) throw new Error("Invalid text");
	return value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
}

export function sanitize(input) {
	if (!input || !["online", "away", "offline"].includes(input.state)) throw new Error("Invalid state");
	if (input.state === "offline") return { state: "offline", activity: null, music: null };
	const activity = input.state === "away" || input.activity == null ? null : cleanText(input.activity, 80);
	let music = null;
	if (input.music != null) {
		const title = cleanText(input.music.title, 200);
		const artist = cleanText(input.music.artist, 200);
		if (!title || typeof input.music.playing !== "boolean") throw new Error("Invalid music");
		music = { title, artist, playing: input.music.playing };
	}
	return { state: input.state, activity, music };
}

async function readBody(request) {
	const reader = request.body?.getReader();
	if (!reader) throw new Error("Empty body");
	let size = 0;
	const chunks = [];
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		size += value.byteLength;
		if (size > MAX_BODY) { await reader.cancel(); throw new Error("Body too large"); }
		chunks.push(value);
	}
	const bytes = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
	return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
	async fetch(request, env) {
		const path = new URL(request.url).pathname;
		if (path !== "/status") return json({ error: "Not found" }, 404);
		if (request.method !== "GET" && request.method !== "POST") return json({ error: "Method not allowed" }, 405);
		if (request.method === "POST") {
			if (!env.PRESENCE_TOKEN || env.PRESENCE_TOKEN.length < 32) return json({ error: "Writer not configured" }, 503);
			if (request.headers.get("Authorization") !== `Bearer ${env.PRESENCE_TOKEN}`) return json({ error: "Unauthorized" }, 401);
			if (!request.headers.get("Content-Type")?.startsWith("application/json")) return json({ error: "Expected JSON" }, 415);
			let payload;
			try { payload = sanitize(await readBody(request)); }
			catch { return json({ error: "Invalid status payload" }, 400); }
			const stub = env.PRESENCE.get(env.PRESENCE.idFromName("windows"));
			return stub.fetch(new Request("https://presence/status", { method: "POST", body: JSON.stringify(payload) }));
		}
		return env.PRESENCE.get(env.PRESENCE.idFromName("windows")).fetch(new Request("https://presence/status"));
	},
};

export class PresenceState {
	constructor(ctx) { this.ctx = ctx; }
	async fetch(request) {
		if (request.method === "POST") {
			const payload = sanitize(await request.json());
			const updatedAt = Date.now();
			await this.ctx.storage.put("status", { ...payload, updatedAt, expiresAt: updatedAt + TTL });
			return json({ ok: true });
		}
		const status = await this.ctx.storage.get("status");
		return json(!status || status.state === "offline" || Date.now() >= status.expiresAt ? offline(status?.updatedAt) : status);
	}
}
