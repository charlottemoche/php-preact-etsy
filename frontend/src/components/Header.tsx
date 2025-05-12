import { useLocation } from 'preact-iso';
import etsyLogo from '../assets/etsy-nav.svg';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav class="flex gap-2 justify-between w-full bg-brand items-center py-4">
				<img src={etsyLogo} alt="Preact logo" height="80" width="80" class="invert px-4" />
				<div class="space-x-4 items-center text-white px-4">
					<a
						href="/"
						class={`hover:border-b hover:text-white transition ${url === '/' ? 'active border-b' : ''
							}`}
					>
						Home
					</a>
					<a
						href="/tickets"
						class={`hover:border-b hover:text-white transition ${url === '/tickets' ? 'active border-b' : ''
							}`}
					>
						Dashboard
					</a>
					<a
						href="/help"
						class={`hover:border-b hover:text-white transition ${url === '/help' ? 'active border-b' : ''
							}`}
					>
						Help
					</a>
				</div>
			</nav>
		</header>
	);
}