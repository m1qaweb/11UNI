<script lang="ts">
	import { base } from '$app/paths';
	import { restaurantInfo } from '$lib/data/restaurant-info';
	import Navigation from './Navigation.svelte';
	import CartButton from './CartButton.svelte';
	import CartDrawer from './CartDrawer.svelte';
	import type { NavItem } from '$lib/types';
	import { UI_TEXT } from '$lib/constants/georgian-text';

	let isCartOpen = $state(false);

	function toggleCart() {
		isCartOpen = !isCartOpen;
	}

	const navItems: NavItem[] = [
		{
			id: 'home',
			label: UI_TEXT.navigation.home,
			href: '/',
			ariaLabel: UI_TEXT.navigation.home,
			order: 1,
		},
		{
			id: 'about',
			label: UI_TEXT.navigation.about,
			href: '/#about',
			ariaLabel: UI_TEXT.navigation.about,
			order: 2,
		},
		{
			id: 'menu',
			label: UI_TEXT.navigation.menu,
			href: '/menu',
			ariaLabel: UI_TEXT.navigation.menu,
			order: 3,
		},
	];

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	$effect(() => {
		function handleScroll() {
			isScrolled = window.scrollY > 50;
		}

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll(); // Initial check

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<header
	class="header fixed top-0 left-0 right-0 z-50 transition-all duration-300"
	class:scrolled={isScrolled}
>
	<div class="container-custom">
		<div class="header-content flex items-center justify-between py-4">

			<div class="logo-section">
				<a href="{base}/" class="logo-link flex items-center gap-3" aria-label={restaurantInfo.name}>
					<div class="logo-icon">
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M20 10 L25 20 L20 30 L15 20 Z"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="1"
								class="text-primary"
							/>
						</svg>
					</div>
					<div class="logo-text">
						<h1 class="restaurant-name text-xl md:text-2xl font-bold text-text">
							{restaurantInfo.name}
						</h1>
					</div>
				</a>
			</div>

			<div class="nav-cart-container">
				<Navigation
					items={navItems}
					{isMobileMenuOpen}
					onToggle={toggleMobileMenu}
					onClose={closeMobileMenu}
				/>
				<CartButton onClick={toggleCart} />
			</div>
		</div>
	</div>
</header>

<CartDrawer bind:isOpen={isCartOpen} />

<style>
	.header {
		background-color: transparent;
		backdrop-filter: none;
	}

	.header.scrolled {
		background-color: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		box-shadow: var(--shadow-md);
	}

	.nav-cart-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.logo-link {
		text-decoration: none;
		transition: opacity var(--transition-fast);
	}

	.logo-link:hover {
		opacity: 0.8;
	}

	.logo-link:focus-visible {
		outline: 3px solid var(--color-primary);
		outline-offset: 4px;
		border-radius: var(--radius-sm);
	}

	.restaurant-name {
		line-height: 1.2;
		margin: 0;
	}

	:global(body) {
		padding-top: 80px;
	}

	@media (max-width: 768px) {
		:global(body) {
			padding-top: 70px;
		}
	}
</style>
