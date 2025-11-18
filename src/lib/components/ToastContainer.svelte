<script lang="ts">
	import { toast, type Toast } from '$lib/stores/toast';
	import { CheckCircle, XCircle, Info, X } from 'lucide-svelte';

	let toasts = $state<Toast[]>([]);

	$effect(() => {
		const unsubscribe = toast.subscribe(items => {
			toasts = items;
		});
		return unsubscribe;
	});

	function getIcon(type: Toast['type']) {
		switch (type) {
			case 'success':
				return CheckCircle;
			case 'error':
				return XCircle;
			case 'info':
				return Info;
		}
	}
</script>

<div class="toast-container">
	{#each toasts as item (item.id)}
		<div class="toast toast-{item.type}">
			<div class="toast-icon">
				<svelte:component this={getIcon(item.type)} size={20} />
			</div>
			<p class="toast-message">{item.message}</p>
			<button 
				class="toast-close"
				onclick={() => toast.dismiss(item.id)}
				aria-label="დახურვა"
			>
				<X size={16} />
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 100px;
		right: var(--spacing-lg);
		z-index: 10001;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		pointer-events: none;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		pointer-events: auto;
		animation: slideInRight 0.3s ease-out;
		min-width: 300px;
		max-width: 400px;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.toast-success {
		border-left: 4px solid #28a745;
	}

	.toast-success .toast-icon {
		color: #28a745;
	}

	.toast-error {
		border-left: 4px solid #dc3545;
	}

	.toast-error .toast-icon {
		color: #dc3545;
	}

	.toast-info {
		border-left: 4px solid #17a2b8;
	}

	.toast-info .toast-icon {
		color: #17a2b8;
	}

	.toast-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.toast-message {
		flex: 1;
		margin: 0;
		font-size: 0.9375rem;
		color: var(--color-text);
		font-weight: 500;
	}

	.toast-close {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		color: var(--color-text-light);
		transition: color var(--transition-fast);
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}

	.toast-close:hover {
		color: var(--color-text);
	}

	@media (max-width: 768px) {
		.toast-container {
			top: 80px;
			right: var(--spacing-md);
			left: var(--spacing-md);
		}

		.toast {
			min-width: unset;
			max-width: unset;
		}
	}
</style>
