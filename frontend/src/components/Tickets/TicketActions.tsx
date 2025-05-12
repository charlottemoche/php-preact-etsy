import { useState } from 'preact/hooks';
import { NoteModal } from '../../components/NoteModal.js';
import type { TicketType, TicketActionType, TicketActionHandler } from '../../types/ticket.js';
import Button from '../CoreComponents.js';

type TicketActionsProps = {
	ticket: TicketType;
	onAction: TicketActionHandler;
};

export function TicketActions({ ticket, onAction }: TicketActionsProps) {
	const { status, escalated } = ticket;
	const [showNoteModal, setShowNoteModal] = useState(false);

	function handleClick(e: MouseEvent, type: TicketActionType) {
		e.preventDefault();
		e.stopPropagation();
		onAction(type);
	}

	return (
		<div class="pt-4 flex gap-2 shrink-0">
			<Button
				variant="green"
				onClick={(e) => handleClick(e, status === 'resolved' ? 'reopen' : 'resolve')}
			>
				{status === 'resolved' ? 'Reopen' : 'Resolve'}
			</Button>

			<Button
				variant="yellow"
				onClick={(e) => handleClick(e, 'escalate')}
				disabled={escalated}
			>
				{escalated ? 'Escalated' : 'Escalate'}
			</Button>

			<Button variant="gray" onClick={() => setShowNoteModal(true)}>
				Add Note
			</Button>

			{showNoteModal && (
				<NoteModal
					onSubmit={(note) => onAction('note', note)}
					onClose={() => setShowNoteModal(false)}
				/>
			)}
		</div>
	);
}