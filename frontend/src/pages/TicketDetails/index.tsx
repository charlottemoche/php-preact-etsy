import { useRoute } from 'preact-iso';
import { TicketInfo } from '../../components/Tickets/TicketInfo.js';
import { TicketActions } from '../../components/Tickets/TicketActions.js';
import { useTicket } from '../../hooks/useTicket.js';
import { useTicketActions } from '../../hooks/useTicketActions.js';

export function TicketDetailsPage() {
	const { params } = useRoute();
	const id = params.id;

	const { ticket, notes, loading, error, refresh } = useTicket(id);
	const { handleAction } = useTicketActions({ ticket, fetchTickets: refresh });

	if (loading) return <p class="p-6 text-sm text-gray-500 dark:text-gray-300">Loading ticket...</p>;
	if (error) return <p class="p-6 text-red-500">{error}</p>;
	if (!ticket) return <p class="p-6 text-gray-500 dark:text-gray-300">Ticket not found.</p>;

	return (
		<main>
			<div class="mb-6">
				<a href="/tickets" class="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-gray-100 hover:underline">← Back to dashboard</a>
			</div>
			<div class="bg-white dark:bg-dark-2 p-4 rounded shadow max-w-2xl mx-auto">
				<h2 class="text-xl font-semibold mb-4 border-b pb-2">Ticket #{ticket.id}</h2>

				<TicketInfo ticket={ticket} showFullDetails={true}/>

				{notes.length > 0 && (
					<div class="pt-6 text-sm space-y-2">
						<p class="font-medium">Notes:</p>
						{notes.map((note) => (
							<p key={note.id} class="border-l-2 border-gray-300 pl-2">
								<span class="text-gray-600 dark:text-gray-300">{note.text}</span>
								<span class="block text-xs text-gray-400">
									{new Date(note.created_at).toLocaleString()}
								</span>
							</p>
						))}
					</div>
				)}

				<div class="border-t mt-4">
					<TicketActions ticket={ticket} onAction={(type, note) => handleAction(ticket.id, type, note)} />
				</div>
			</div>

		</main>
	);
}