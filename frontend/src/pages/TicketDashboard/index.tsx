import { useState } from 'preact/hooks';
import { TicketInfo } from '../../components/Tickets/TicketInfo.js';
import { TicketActions } from '../../components/Tickets/TicketActions.js';
import { useTicketActions } from '../../hooks/useTicketActions.js';
import { MetricsPanel } from '../../components/MetricsPanel.js';
import { useTickets } from '../../hooks/useTickets.js';
import { Select } from '../../components/CoreComponents.js';
import { h } from 'preact';

export function TicketDashboard() {
	const [queryKey, setQueryKey] = useState(0);

	const params = new URLSearchParams(window.location.search);
	const filter = (params.get('status') ?? 'all') as 'all' | 'open' | 'resolved';
	const sortOrder = (params.get('sort') ?? 'newest') as 'newest' | 'oldest';

	const { tickets, hasFetched, fetchTickets } = useTickets({ filter, queryKey });
	const { handleAction } = useTicketActions({ tickets, fetchTickets });

	const filteredTickets = tickets.sort((a, b) => {
		const timeA = new Date(a.created_at).getTime();
		const timeB = new Date(b.created_at).getTime();
		return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
	});

	function handleChangeFilter(e: Event) {
		const selectedFilter = (e.target as HTMLSelectElement).value;
		params.set('status', selectedFilter);
		window.history.pushState({}, '', `/tickets?${params.toString()}`);
		setQueryKey((prev) => prev + 1);
	}

	return (
		<main>
			<div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b">
				<header>
					<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-300 border-b md:border-none pb-2 mb-2 md:pb-0 md:mb-0">Ticket Dashboard</h1>
				</header>
				<div class="flex gap-4 items-center">
					<div>
						<Select
							id="filter"
							label="Show:"
							value={filter}
							onChange={handleChangeFilter}
						>
							<option value="all">All</option>
							<option value="open">Open</option>
							<option value="resolved">Resolved</option>
						</Select>
					</div>
					<div>
						<Select
							id="sort"
							label="Sort:"
							value={sortOrder}
							onChange={handleChangeFilter}
						>
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
						</Select>
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
						<ul class="grid md:grid-cols-2 gap-6">
							{filteredTickets.map((ticket) => (
								<li key={ticket.id} class="border border-gray-100 shadow dark:border-gray-600 rounded dark:bg-dark-2 bg-white">
									<TicketInfo ticket={ticket} showFullDetails={false} />
									<div class="border-t dark:border-gray-600 px-3 pb-3">
										<div class="flex items-center justify-between">
											<TicketActions ticket={ticket} onAction={(type, note) => handleAction(ticket.id, type, note)} />
											<div class="flex items-center gap-2 mt-4">
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
													<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
												</svg>
												<div class="text-gray-500 dark:text-gray-300 text-sm">
													{ticket.note_count === 0
														? 'No notes'
														: ticket.note_count === 1
															? '1 note'
															: `${ticket.note_count} notes`}
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
}