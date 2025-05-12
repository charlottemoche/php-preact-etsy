import type { TicketType } from '../../types/ticket.js';

export function TicketDetails({ ticket }: { ticket: TicketType }) {
	return (
		<div>
			<h2 class="text-xl font-bold mb-4">Ticket #{ticket.id}</h2>
			<p class="mb-2"><strong>Issue:</strong> {ticket.issue}</p>
			<p class="mb-4"><strong>Details:</strong> {ticket.details}</p>
		</div>
	);
}