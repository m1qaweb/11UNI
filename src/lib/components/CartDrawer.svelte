<script lang="ts">
	import { cart, type CartItem } from '$lib/stores/cart';
	import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-svelte';
	import OptimizedImage from './OptimizedImage.svelte';

	let { isOpen = $bindable(false) } = $props();

	let cartItems = $state<CartItem[]>([]);

	$effect(() => {
		const unsubscribe = cart.subscribe(items => {
			cartItems = items;
		});
		return unsubscribe;
	});

	let total = $derived(cart.getTotal(cartItems));
	let itemCount = $derived(cart.getItemCount(cartItems));

	function closeCart() {
		isOpen = false;
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeCart();
		}
	}

	function updateQuantity(id: string, quantity: number) {
		cart.updateQuantity(id, quantity);
	}

	function removeItem(id: string) {
		cart.removeItem(id);
	}

	function handleCheckout() {
		alert('გადახდის ფუნქციონალი მალე დაემატება!');
	}
</script>

{#if isOpen}
	<div class="cart-overlay" onclick={handleOverlayClick}>
		<div class="cart-drawer">

			<div class="cart-header">
				<div class="header-content">
					<ShoppingCart size={24} />
					<h2>კალათა</h2>
					{#if itemCount > 0}
						<span class="item-count">{itemCount}</span>
					{/if}
				</div>
				<button class="close-button" onclick={closeCart} aria-label="დახურვა">
					<X size={24} />
				</button>
			</div>

			<div class="cart-content">
				{#if cartItems.length === 0}
					<div class="empty-cart">
						<ShoppingCart size={64} strokeWidth={1} />
						<p>თქვენი კალათა ცარიელია</p>
						<span>დაამატეთ კერძები მენიუდან</span>
					</div>
				{:else}
					<div class="cart-items">
						{#each cartItems as item (item.id)}
							<div class="cart-item">
								<div class="item-image">
									<OptimizedImage 
										src={item.image} 
										alt={item.title}
										widths={[160]}
										loading="eager"
									/>
								</div>
								<div class="item-details">
									<h3>{item.title}</h3>
									<p class="item-price">{item.price} ₾</p>

									<div class="quantity-controls">
										<button 
											class="qty-btn"
											onclick={() => updateQuantity(item.id, item.quantity - 1)}
											aria-label="შემცირება"
										>
											<Minus size={16} />
										</button>
										<span class="quantity">{item.quantity}</span>
										<button 
											class="qty-btn"
											onclick={() => updateQuantity(item.id, item.quantity + 1)}
											aria-label="გაზრდა"
										>
											<Plus size={16} />
										</button>
									</div>
								</div>
								<div class="item-actions">
									<p class="item-total">{item.price * item.quantity} ₾</p>
									<button 
										class="remove-btn"
										onclick={() => removeItem(item.id)}
										aria-label="წაშლა"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			{#if cartItems.length > 0}
				<div class="cart-footer">
					<div class="total-row">
						<span class="total-label">ჯამი:</span>
						<span class="total-amount">{total.toFixed(2)} ₾</span>
					</div>
					<button class="checkout-button" onclick={handleCheckout}>
						გადახდა
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.cart-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10000;
		display: flex;
		justify-content: flex-end;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.cart-drawer {
		width: 100%;
		max-width: 480px;
		background: white;
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-lg) var(--spacing-xl);
		border-bottom: 2px solid #f0f0f0;
		background: white;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.header-content h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
	}

	.item-count {
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.close-button {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: var(--spacing-xs);
		color: var(--color-text-light);
		transition: all var(--transition-fast);
		border-radius: var(--radius-sm);
	}

	.close-button:hover {
		background: #f8f9fa;
		color: var(--color-text);
	}

	.cart-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-lg);
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		text-align: center;
		color: var(--color-text-light);
		padding: var(--spacing-2xl);
	}

	.empty-cart p {
		margin: var(--spacing-lg) 0 var(--spacing-xs);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.empty-cart span {
		font-size: 0.9375rem;
	}

	.cart-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.cart-item {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background: #f8f9fa;
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.cart-item:hover {
		background: #f0f1f3;
	}

	.item-image {
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: var(--radius-md);
		overflow: hidden;
		flex-shrink: 0;
		background-color: #f0f0f0;
	}

	.item-image :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.item-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.item-details h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
		line-height: 1.3;
	}

	.item-price {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-light);
		font-weight: 500;
	}

	.quantity-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: auto;
	}

	.qty-btn {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
		color: var(--color-text);
	}

	.qty-btn:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.quantity {
		min-width: 32px;
		text-align: center;
		font-weight: 600;
		color: var(--color-text);
	}

	.item-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}

	.item-total {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.remove-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: var(--spacing-xs);
		color: #dc3545;
		transition: all var(--transition-fast);
		border-radius: var(--radius-sm);
	}

	.remove-btn:hover {
		background: rgba(220, 53, 69, 0.1);
	}

	.cart-footer {
		padding: var(--spacing-xl);
		border-top: 2px solid #f0f0f0;
		background: white;
		position: sticky;
		bottom: 0;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid #e0e0e0;
	}

	.total-label {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.total-amount {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.checkout-button {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-lg);
		background: linear-gradient(135deg, var(--color-primary) 0%, #a00000 100%);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		font-size: 1.125rem;
		font-weight: 700;
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
	}

	.checkout-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
	}

	.checkout-button:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.cart-drawer {
			max-width: 100%;
		}

		.cart-content {
			padding: var(--spacing-md);
		}

		.item-image {
			width: 70px;
			height: 70px;
		}

		.item-details h3 {
			font-size: 0.9375rem;
		}

		.total-amount {
			font-size: 1.375rem;
		}
	}
</style>
