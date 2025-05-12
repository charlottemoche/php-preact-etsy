import { Ticket } from '../../components/Tickets/Ticket.js';
import { TicketType } from '../../types/ticket.js';
import { useEffect, useState } from 'preact/hooks';
import { useTicketActions } from '../../hooks/useTicketActions.js';
import axios from 'axios';

export function TicketDashboard() {
	const [queryKey, setQueryKey] = useState(0);
	const [tickets, setTickets] = useState<TicketType[]>([]);
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
		const url =
			filter === 'all'
				? '/api/tickets.php'
				: `/api/tickets.php?status=${filter}`;

		axios
			.get(url)
			.then((res) => {
				setTickets(res.data);
			})
			.catch((err) => {
				console.error("Error fetching tickets:", err);
			});
	}

	useEffect(() => {
		fetchTickets();
	}, [filter, queryKey]);

	return (
		<main>
			<div class="flex justify-between items-center mb-6">
				<header>
					<h1 class="text-2xl font-bold text-gray-800">Ticket Dashboard</h1>
				</header>
				<div class="flex gap-4 items-center">
					<div>
						<label htmlFor="filter" class="text-sm font-medium text-gray-700 mr-2">Show:</label>
						<select
							id="filter"
							value={filter}
							onChange={(e) => {
								params.set('status', e.currentTarget.value);
								window.history.pushState({}, '', `/tickets?${params.toString()}`);
								setQueryKey((prev) => prev + 1);
							}}
							class="border border-gray-300 rounded px-2 py-1 text-sm"
						>
							<option value="all">All</option>
							<option value="open">Open</option>
							<option value="resolved">Resolved</option>
						</select>
					</div>
					<div>
						<label htmlFor="sort" class="text-sm font-medium text-gray-700 mr-2">Sort:</label>
						<select
							id="sort"
							value={sortOrder}
							onChange={(e) => {
								params.set('sort', e.currentTarget.value);
								window.history.pushState({}, '', `/tickets?${params.toString()}`);
								setQueryKey((prev) => prev + 1);
							}}
							class="border border-gray-300 rounded px-2 py-1 text-sm"
						>
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
						</select>
					</div>
				</div>
			</div>
			<section class="bg-white p-4 rounded shadow max-w-xl">
				<h2 class="text-lg font-semibold text-gray-800 mb-4">{filter === 'all' ? 'All Tickets' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Tickets'}</h2>
				{filteredTickets.length === 0 && (
					<div class="text-gray-500">
						<p>{filter === 'all' ? 'No tickets.' : `No ${filter} tickets.`}</p>
					</div>
				)}
				{filteredTickets.length > 0 && (
					<ul class="space-y-6">
						{filteredTickets.map((ticket) => (
							<Ticket
								key={ticket.id}
								ticket={ticket}
								onAction={(type, note) => handleAction(ticket.id, type, note)}
							/>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}