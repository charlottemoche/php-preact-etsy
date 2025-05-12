import axios from 'axios';
import type { TicketType, TicketActionType } from '../types/ticket.js';

export async function updateTicket({
	ticket,
	action
}: {
	ticket: TicketType;
	action: TicketActionType;
}): Promise<void> {
	let update: Partial<TicketType> = {};

	switch (action) {
		case 'resolve':
			update = { status: 'resolved' };
			break;
		case 'reopen':
			update = { status: 'open' };
			break;
		case 'escalate':
			update = { escalated: true };
			break;
		default:
			console.warn(`Unknown action type: ${action}`);
			return;
	}

	await axios.patch(`/api/tickets/${ticket.id}`, update)
}
