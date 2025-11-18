<script lang="ts">
	import type { NavItem } from '$lib/types';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { smoothScrollTo, initScrollSpy, lockScroll, unlockScroll } from '$lib/utils/scroll';
	import { UI_TEXT } from '$lib/constants/georgian-text';

	interface Props {
		items: NavItem[];
		isMobileMenuOpen: boolean;
		onToggle: () => void;
		onClose: () => void;
	}

	let { items, isMobileMenuOpen, onToggle, onClose }: Props = $props();

	let activeSection = $state<string | null>('home');

	function getHref(href: string): string {
		if (href.startsWith('#')) return href;
		return `${base}${href}`;
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			const sectionIds = items.map((item) => item.id);
			const cleanup = initScrollSpy(
				sectionIds,
				(activeSectionId) => {
					activeSection = activeSectionId;
				},
				80
			);

			return cleanup;
		}
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			if (isMobileMenuOpen) {
				lockScroll();
			} else {
				unlockScroll();
			}

			return () => {
				unlockScroll();
			};
		}
	});

	function handleNavClick(event: MouseEvent, item: NavItem) {
		event.preventDefault();

		if (item.href.startsWith('/') && !item.href.includes('#')) {

			goto(item.href);
			onClose();
			return;
		}

		if (item.href.includes('#')) {
			const [path, hash] = item.href.split('#');
			const currentPath = window.location.pathname;

			if (path && path !== currentPath) {
				goto(item.href);
				onClose();
				return;
			}

			if (hash) {
				smoothScrollTo(hash, { offset: 80 });
				history.pushState(null, '', item.href);
			}
		}

		onClose();
	}

	function handleKeyDown(event: KeyboardEvent, item: NavItem) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			if (item.href.startsWith('/') && !item.href.includes('#')) {

				goto(item.href);
				onClose();
				return;
			}

			if (item.href.includes('#')) {
				const [path, hash] = item.href.split('#');
				const currentPath = window.location.pathname;

				if (path && path !== currentPath) {
					goto(item.href);
					onClose();
					return;
				}

				if (hash) {
					smoothScrollTo(hash, { offset: 80 });
					history.pushState(null, '', item.href);
				}
			}

			onClose();
		}
	}

	$effect(() => {
		if (typeof window !== 'undefined' && isMobileMenuOpen) {
			function handleEscape(event: KeyboardEvent) {
				if (event.key === 'Escape') {
					onClose();
				}
			}

			window.addEventListener('keydown', handleEscape);

			return () => {
				window.removeEventListener('keydown', handleEscape);
			};
		}
	});
</script>

<nav
	id="main-navigation"
	class="navigation"
	class:open={isMobileMenuOpen}
	aria-label={UI_TEXT.a11y.mainNavigation}
>
	<ul class="nav-list" role="menubar">
		{#each items as item (item.id)}
			<li class="nav-item" role="none">
				<a
					href={getHref(item.href)}
					class="nav-link"
					class:active={activeSection === item.id}
					role="menuitem"
					aria-label={item.ariaLabel}
					aria-current={activeSection === item.id ? 'page' : undefined}
					onclick={(e) => handleNavClick(e, item)}
					onkeydown={(e) => handleKeyDown(e, item)}
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

{#if isMobileMenuOpen}
	<div class="mobile-backdrop md:hidden" onclick={onClose} role="presentation"></div>
{/if}

<style>

	.navigation {
		display: none;
	}

	@media (min-width: 768px) {
		.navigation {
			display: block;
		}

		.nav-list {
			display: flex;
			gap: var(--spacing-lg);
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.nav-item {
			margin: 0;
		}

		.nav-link {
			display: block;
			padding: var(--spacing-sm) var(--spacing-md);
			color: var(--color-text);
			text-decoration: none;
			font-weight: 500;
			font-size: 1rem;
			transition: color var(--transition-fast);
			border-radius: var(--radius-sm);
			position: relative;
		}

		.nav-link::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 2px;
			background-color: var(--color-primary);
			transition: width var(--transition-fast);
		}

		.nav-link:hover,
		.nav-link.active {
			color: var(--color-primary);
		}

		.nav-link.active::after {
			width: 80%;
		}

		.nav-link:focus-visible {
			outline: 3px solid var(--color-primary);
			outline-offset: 2px;
		}
	}

	@media (max-width: 767px) {
		.navigation {
			position: fixed;
			top: 70px;
			right: -100%;
			width: 280px;
			height: calc(100vh - 70px);
			background-color: var(--color-bg);
			box-shadow: var(--shadow-xl);
			transition: right 0.3s ease-in-out;
			overflow-y: auto;
			z-index: 1000;
		}

		.navigation.open {
			right: 0;
		}

		.nav-list {
			display: flex;
			flex-direction: column;
			gap: 0;
			list-style: none;
			margin: 0;
			padding: var(--spacing-lg) 0;
		}

		.nav-item {
			margin: 0;
		}

		.nav-link {
			display: block;
			padding: var(--spacing-md) var(--spacing-xl);
			color: var(--color-text);
			text-decoration: none;
			font-weight: 500;
			font-size: 1.125rem;
			transition: all var(--transition-fast);
			border-left: 4px solid transparent;
		}

		.nav-link:hover,
		.nav-link.active {
			color: var(--color-primary);
			background-color: var(--color-bg-light);
			border-left-color: var(--color-primary);
		}

		.nav-link:focus-visible {
			outline: 3px solid var(--color-primary);
			outline-offset: -3px;
		}

		.mobile-backdrop {
			position: fixed;
			top: 70px;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
			animation: fadeIn 0.3s ease-in-out;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}
</style>
