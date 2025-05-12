import { updateTicket } from '../lib/updateTicket.js';
import type { TicketType } from '../types/ticket.js';
import type { TicketActionType } from '../types/ticket.js';

export function useTicketActions({
	tickets,
	fetchTickets,
}: {
	tickets: TicketType[];
	fetchTickets: () => void;
}) {
	async function handleAction(id: string, type: TicketActionType) {
		const ticket = tickets.find(t => t.id === id);
		if (!ticket) return;

		try {
			await updateTicket({ ticket, action: type });
			fetchTickets();
		} catch (err) {
			console.error("Failed to update ticket:", err);
		}
	}

	return { handleAction };
}