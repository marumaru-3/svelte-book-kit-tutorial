import { addToCart, loadCartItems } from '$lib/server/cart';
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

export async function load({ locals, params }) {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);
	let cart: any[] = [];
	if (locals.currentUser) {
		cart = await loadCartItems(locals.currentUser.userId);
	}

	return { product, relatedProducts, cart };
}

export const actions = {
	default: async ({ locals, request }) => {
		if (locals.currentUser) {
			const data = await request.formData();

			const productId = data.get('productId');

			if (typeof productId !== 'string') {
				return;
			}

			await addToCart(locals.currentUser.userId, productId);
		}
	}
};

// export const csr = false;
