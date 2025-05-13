import { useEffect, useState } from 'preact/hooks';
import { Ticket } from '../../components/Tickets/Ticket.js';
import { TicketType } from '../../types/ticket.js';
import { useTicketActions } from '../../hooks/useTicketActions.js';
import { MetricsPanel } from '../../components/MetricsPanel.js';
import axios from 'axios';

export function TicketDashboard() {
	const [queryKey, setQueryKey] = useState(0);
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const [hasFetched, setHasFetched] = useState(false);

	const params = new URLSearchParams(window.location.search);
	const filter = (params.get('status') ?? 'all') as 'all' | 'open' | 'resolved';
	const sortOrder = (params.get('sort') ?? 'newest') as 'newest' | 'oldest';

	const filteredTickets = tickets.sort((a, b) => {
		const timeA = new Date(a.created_at).getTime();
		const timeB = new Date(b.created_at).getTime();
		return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
	});

	const { handleAction } = useTicketActions({ tickets, fetchTickets });

	function fetchTickets() {
		const url = filter === 'all'
			? '/api/tickets'
			: `/api/tickets?status=${filter}`;

		axios
			.get(url)
			.then((res) => {
				setTickets(res.data);
				setHasFetched(true);
			})
			.catch((err) => {
				console.error("Error fetching tickets:", err);
			});
	}

	useEffect(() => {
		setHasFetched(false);
		fetchTickets();
	}, [filter, queryKey]);

	return (
		<main>
			<div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b">
				<header>
					<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-300 border-b md:border-none pb-2 mb-2 md:pb-0 md:mb-0">Ticket Dashboard</h1>
				</header>
				<div class="flex gap-4 items-center">
					<div>
						<label htmlFor="filter" class="text-sm font-medium text-gray-700 dark:text-gray-400 mr-2">Show:</label>
						<select
							id="filter"
							value={filter}
							onChange={(e) => {
								params.set('status', e.currentTarget.value);
								window.history.pushState({}, '', `/tickets?${params.toString()}`);
								setQueryKey((prev) => prev + 1);
							}}
							class="border border-gray-300 rounded px-2 py-1 text-sm w-full dark:bg-dark-2"
						>
							<option value="all">All</option>
							<option value="open">Open</option>
							<option value="resolved">Resolved</option>
						</select>
					</div>
					<div>
						<label htmlFor="sort" class="text-sm font-medium text-gray-700 dark:text-gray-400 mr-2">Sort:</label>
						<select
							id="sort"
							value={sortOrder}
							onChange={(e) => {
								params.set('sort', e.currentTarget.value);
								window.history.pushState({}, '', `/tickets?${params.toString()}`);
								setQueryKey((prev) => prev + 1);
							}}
							class="border border-gray-300 rounded px-2 py-1 text-sm w-full dark:bg-dark-2"
						>
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
						</select>
					</div>
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-10 lg:gap-20">
				<section class="md:basis-1/4">
					<MetricsPanel />
				</section>

				<section class="md:basis-3/4">
					<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
						{filter === 'all' ? 'All Tickets' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Tickets'}
					</h2>

					{!hasFetched ? null : filteredTickets.length === 0 ? (
						<p class="text-sm text-gray-500 dark:text-gray-300">
							{filter === 'all' ? 'No tickets.' : `No ${filter} tickets.`}
						</p>
					) : (
						<ul class="grid md:grid-cols-2 gap-6 bg-white dark:bg-dark-2 dark:border dark:border-black p-6 rounded shadow dark:shadow-2xl">
							{filteredTickets.map((ticket) => (
								<li key={ticket.id}>
									<Ticket ticket={ticket} onAction={(type, note) => handleAction(ticket.id, type, note)} />
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
}