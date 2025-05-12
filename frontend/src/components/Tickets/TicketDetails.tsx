import type { TicketType, TicketActionHandler } from '../../types/ticket.js';
import { TicketActions } from './TicketActions.js';
import type { Note } from '../../types/ticket.js';

type TicketDetailsProps = {
	ticket: TicketType;
	notes?: Note[];
	onAction: TicketActionHandler;
};

export function TicketDetails({ ticket, notes, onAction }: TicketDetailsProps) {
	return (
		<div>
			<h2 class="text-xl font-semibold mb-4 border-b pb-2">Ticket #{ticket.id}</h2>
			<p class="mb-2"><span class="font-semibold">Issue:</span> {ticket.issue}</p>
			<p><span class="font-semibold">Details:</span> {ticket.details}</p>
			{notes && notes.length > 0 && (
				<div class="pt-4 text-sm space-y-1">
					<p class="font-medium">Notes:</p>
					{notes.map((note) => (
						<p key={note.id} class="border-l-2 border-gray-300 pl-2 text-gray-600">
							{note.text}
							<span class="block text-xs text-gray-400">
								{new Date(note.created_at).toLocaleString()}
							</span>
						</p>
					))}
				</div>
			)}

			<div class="border-t mt-4">
				<TicketActions ticket={ticket} onAction={onAction} />
			</div>
		</div>
	);
}