import type { TicketType, TicketActionHandler } from '../../types/ticket.js';
import { TicketActions } from './TicketActions.js';

type TicketDetailsProps = {
	ticket: TicketType;
	onAction: TicketActionHandler;
};

export function TicketDetails({ ticket, onAction }: TicketDetailsProps) {
	return (
		<div>
			<h2 class="text-xl font-semibold mb-4 border-b pb-2">Ticket #{ticket.id}</h2>
			<p class="mb-2"><span class="font-semibold">Issue:</span> {ticket.issue}</p>
			<p><span class="font-semibold">Details:</span> {ticket.details}</p>

			<div class="border-t mt-4">
			<TicketActions ticket={ticket} onAction={onAction} />
			</div>
		</div>
	);
}