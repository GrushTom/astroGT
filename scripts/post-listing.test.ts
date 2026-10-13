import assert from "node:assert/strict";
import { test } from "node:test";
import { collapseSeries } from "../src/utils/post-listing";

const post = (id: string, series = "", seriesOrder?: number) => ({
	id,
	data: {
		series,
		seriesOrder,
		title: id,
		published: new Date("2026-10-13"),
		tags: [id],
		category: id,
	},
});

test("one ordered entry per series, independent posts retained, input untouched", () => {
	const input = [
		post("third", "guide", 3),
		post("other"),
		post("first", " guide ", 0),
		post("second", "guide", 1),
		post("missing", "guide"),
	];
	const before = structuredClone(input);
	const result = collapseSeries(input);
	assert.deepEqual(
		result.map((p) => p.id),
		["other", "first"],
	);
	assert.deepEqual(result[1].data.tags, [
		"first",
		"second",
		"third",
		"missing",
	]);
	assert.deepEqual(result[1].listingCategories, [
		"first",
		"second",
		"third",
		"missing",
	]);
	assert.deepEqual(input, before);
});

test("visible members form a fallback entry and distinct series stay separate", () => {
	const result = collapseSeries([
		post("chapter2", "A", 2),
		post("chapter1", "B", 1),
		post("chapter3", "A", 3),
	]);
	assert.deepEqual(
		result.map((p) => p.id),
		["chapter2", "chapter1"],
	);
	assert.equal(collapseSeries([]).length, 0);
});

test("missing orders have deterministic ties and metadata is deduplicated", () => {
	const a = post("a", "guide");
	const b = post("b", "guide");
	b.data.tags = a.data.tags;
	b.data.category = a.data.category;
	assert.deepEqual(collapseSeries([b, a]), collapseSeries([a, b]));
	assert.deepEqual(collapseSeries([b, a])[0].data.tags, ["a"]);
});
