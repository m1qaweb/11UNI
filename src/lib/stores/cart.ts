import { writable } from 'svelte/store';

export interface CartItem {
	id: string;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'>) => {
			update(items => {
				const existingItem = items.find(i => i.id === item.id);

				if (existingItem) {
					return items.map(i => 
						i.id === item.id 
							? { ...i, quantity: i.quantity + 1 }
							: i
					);
				}

				return [...items, { ...item, quantity: 1 }];
			});
		},
		removeItem: (id: string) => {
			update(items => items.filter(i => i.id !== id));
		},
		updateQuantity: (id: string, quantity: number) => {
			update(items => {
				if (quantity <= 0) {
					return items.filter(i => i.id !== id);
				}
				return items.map(i => 
					i.id === id ? { ...i, quantity } : i
				);
			});
		},
		clear: () => set([]),
		getTotal: (items: CartItem[]) => {
			return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
		},
		getItemCount: (items: CartItem[]) => {
			return items.reduce((sum, item) => sum + item.quantity, 0);
		}
	};
}

export const cart = createCartStore();
