<script lang="ts">
	import { cart, type CartItem } from '$lib/stores/cart';
	import { ShoppingCart } from 'lucide-svelte';

	let { onClick } = $props<{ onClick: () => void }>();

	let cartItems = $state<CartItem[]>([]);

	$effect(() => {
		const unsubscribe = cart.subscribe(items => {
			cartItems = items;
		});
		return unsubscribe;
	});

	let itemCount = $derived(cart.getItemCount(cartItems));
	let isAnimating = $state(false);

	$effect(() => {
		if (itemCount > 0) {
			isAnimating = true;
			setTimeout(() => {
				isAnimating = false;
			}, 300);
		}
	});
</script>

<button class="cart-button" onclick={onClick} class:animating={isAnimating} aria-label="კალათა">
	<ShoppingCart size={24} />
	{#if itemCount > 0}
		<span class="cart-badge">{itemCount}</span>
	{/if}
</button>

<style>
	.cart-button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 50%;
		cursor: pointer;
		transition: all var(--transition-fast);
		color: var(--color-text);
	}

	.cart-button:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
	}

	.cart-button.animating {
		animation: bounce 0.3s ease;
	}

	@keyframes bounce {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	.cart-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		min-width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0 4px;
		border: 2px solid white;
		animation: scaleIn 0.2s ease;
	}

	@keyframes scaleIn {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	@media (max-width: 768px) {
		.cart-button {
			width: 44px;
			height: 44px;
		}
	}
</style>
