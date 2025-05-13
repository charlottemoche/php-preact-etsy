import { updateTicket } from '../lib/updateTicket.js';
import type { TicketType } from '../types/ticket.js';
import type { TicketActionType } from '../types/ticket.js';
import axios from 'axios';

export function useTicketActions({
	tickets,
	ticket,
	fetchTickets,
}: {
	tickets?: TicketType[];
	ticket?: TicketType;
	fetchTickets: () => void;
}) {
	async function handleAction(id: string, type: TicketActionType, note?: string) {
		const targetTicket = tickets?.find((t) => t.id === id) ?? ticket;
		if (!targetTicket) return;

		if (type === 'note' && note) {
			await axios
				.post(`/api/tickets/${targetTicket.id}/notes`, { text: note })
				.then(fetchTickets)
				.catch((err) => console.error("Failed to add note:", err));
			return;
		}

		await updateTicket({ ticket: targetTicket, action: type });
		fetchTickets();
	}

	return { handleAction };
}