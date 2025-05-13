import { useLocation } from 'preact-iso';
import etsyLogo from '../assets/etsy-nav.svg';

export function Header() {
	const { url } = useLocation();

	return (
		<header class="w-full bg-brand dark:text-gray-900">
			<nav class="flex gap-2 justify-between items-center py-4 2xl:px-48">
				<img src={etsyLogo} alt="Preact logo" class="invert dark:invert-0 pl-4 2xl:pl-0 w-16 2xl:w-12 2xl:mt-1" />
				<div class="space-x-4 items-center text-white dark:text-gray-900 px-4">
					<a
						href="/"
						class={`hover:border-b dark:border-gray-900 transition ${url === '/' ? 'active border-b dark:border-gray-900' : ''
							}`}
					>
						Home
					</a>
					<a
						href="/tickets"
						class={`hover:border-b dark:border-gray-900 transition ${url === '/tickets' ? 'active border-b dark:border-gray-900' : ''
							}`}
					>
						Dashboard
					</a>
					<a
						href="/help"
						class={`hover:border-b dark:border-gray-900 transition ${url === '/help' ? 'active border-b dark:border-gray-900' : ''
							}`}
					>
						Help
					</a>
				</div>
			</nav>
		</header>
	);
}