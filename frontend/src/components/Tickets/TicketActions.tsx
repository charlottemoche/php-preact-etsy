import type { TicketType, TicketActionType, TicketActionHandler } from '../../types/ticket.js';
import Button from '../CoreComponents.js';

type TicketActionsProps = {
	ticket: TicketType;
	onAction: TicketActionHandler;
};

export function TicketActions({ ticket, onAction }: TicketActionsProps) {
	const { status, escalated } = ticket;

	function handleClick(e: MouseEvent, type: TicketActionType) {
		e.preventDefault();
		e.stopPropagation();
		onAction(type);
	}

	return (
		<div class="pt-4 flex gap-2 shrink-0">
			<Button
				variant="green"
				onClick={(e) => handleClick(e, 'resolve')}
				disabled={status === 'resolved'}
			>
				{status === 'resolved' ? 'Resolved' : 'Resolve'}
			</Button>

			<Button
				variant="yellow"
				onClick={(e) => handleClick(e, 'escalate')}
				disabled={escalated}
			>
				{escalated ? 'Escalated' : 'Escalate'}
			</Button>

			<Button
				variant="gray"
				onClick={(e) => handleClick(e, 'note')}
			>
				Add Note
			</Button>
		</div>
	);
}