import { addToCart, loadCart } from '$lib/server/cart';
import { error } from 'console';
import { loadProducts } from '$lib/server/product';

export type Product = {
	id: string;
	name: string;
	price: number;
	images: string[];
};

async function getProductFromDatabase(productId: string) {
	const products = await loadProducts();
	return products.find((product) => productId === product.id);
}

async function getRelatedProductsFromDatabase(productId: string) {
	const products = await loadProducts();
	return products.filter((product) => productId !== product.id);
}

export async function load({ params }) {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);
	const cart = await loadCart();

	return { product, relatedProducts, cart };
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const productId = data.get('productId');

		if (typeof productId !== 'string') {
			throw error(400, 'Invalid productId');
		}

		await addToCart(productId);
	}
};
