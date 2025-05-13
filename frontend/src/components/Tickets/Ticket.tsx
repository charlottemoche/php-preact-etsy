import type { TicketType, TicketActionHandler } from '../../types/ticket.js';
import { TicketActions } from './TicketActions.js';

type TicketProps = {
	ticket: TicketType;
	onAction: TicketActionHandler;
};

export function Ticket({ ticket, onAction }: TicketProps) {
	const { id, issue, details, created_at } = ticket;

	const createdDate = new Date(created_at).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

	return (
		<li class="border dark:border-gray-600 rounded dark:bg-gray-900">
			<div class="flex flex-col">
				<a href={`/tickets/${id}`} class="block w-full hover:bg-gray-100 dark:hover:bg-gray-800 p-3">
					<span class="font-medium">{`Order #${id} – “${issue}”`}</span>

					<div class="text-xs text-gray-500 dark:text-gray-300 mt-1">
						Created on {createdDate}
					</div>

					<div class="pt-6 text-sm italic truncate text-gray-600 dark:text-gray-400">
						{details}
					</div>
				</a>

				<div class="border-t dark:border-gray-600 px-3 pb-3">
					<TicketActions ticket={ticket} onAction={onAction} />
				</div>
			</div>
		</li>
	);
}