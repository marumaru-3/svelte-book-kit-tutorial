import { database } from '$lib/server/mongodb';
import { readFile } from 'fs/promises';

type Product = {
	id: string;
	name: string;
	price: number;
	images: string[];
};

export async function loadProducts() {
	// const content = await readFile('data/products.json', { encoding: 'utf-8' });
	// return JSON.parse(content) as Product[];
	const products = await database.collection('products').find();
	return (await products.toArray()) as any[];
}

export async function getRecommends(baseId: string) {
	const products = await loadProducts();
	const candidates = products.filter((product) => product.id !== baseId);
	return randomSelect(candidates, 3);
}

// 配列 array から 1個以上 n個以下の要素をランダムに抽出する
function randomSelect(array: Product[], n: number) {
	if (array.length === 0) return [];

	const indices = Array.from({ length: array.length }, (_, i) => i);
	indices.sort(() => Math.random() - 0.5);

	const max = Math.min(array.length, n);

	const count = Math.floor(Math.random() * max) + 1;
	return Array.from({ length: count }, (_, i) => array[indices[i]]);
}
