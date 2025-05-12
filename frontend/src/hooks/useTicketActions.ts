import { updateTicket } from '../lib/updateTicket.js';
import type { TicketType } from '../types/ticket.js';
import type { TicketActionType } from '../types/ticket.js';
import axios from 'axios';

export function useTicketActions({
	tickets,
	fetchTickets,
}: {
	tickets: TicketType[];
	fetchTickets: () => void;
}) {
	async function handleAction(id: string, type: TicketActionType, note?: string) {
		const ticket = tickets.find((t) => t.id === id);
		if (!ticket) return;

		if (type === 'note' && note) {
			await axios
				.post(`/api/tickets/${ticket.id}`, {
					text: note,
				})
				.then(fetchTickets)
				.catch((err) => {
					console.error("Failed to add note:", err);
				});
			return;
		}

		await updateTicket({ ticket, action: type });
		fetchTickets();
	}

	return { handleAction };
}