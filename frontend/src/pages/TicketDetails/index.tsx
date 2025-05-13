import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { TicketDetails } from '../../components/Tickets/TicketDetails.js';
import type { TicketType, TicketActionType, Note } from '../../types/ticket.js';
import axios from 'axios';

export function TicketDetailsPage() {
	const { params } = useRoute();
	const id = params.id;

	const [ticket, setTicket] = useState<TicketType | null>(null);
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const refreshTicket = async () => {
		try {
			const [ticketRes, notesRes] = await Promise.all([
				axios.get(`/api/tickets/${id}`),
				axios.get(`/api/tickets/${id}/notes`)
			]);

			setTicket(ticketRes.data);
			setNotes(notesRes.data);
			setError(null);
		} catch (err) {
			console.error("Could not load ticket or notes:", err);
			setError("Could not load ticket.");
		} finally {
			setLoading(false);
		}
	};

	function handleAction(type: TicketActionType, note?: string) {
		if (!ticket) return;

		if (type === 'note' && note) {
			axios.post(`/api/tickets/${ticket.id}/notes`, { text: note })
				.then(refreshTicket)
				.catch((err) => {
					console.error("Failed to add note:", err);
				});
			return;
		}

		axios.patch(`/api/tickets/${ticket.id}`, {
			status: type === 'resolve' ? 'resolved' : 'open',
			escalated: type === 'escalate'
		})
			.then(refreshTicket)
			.catch((err) => {
				console.error("Failed to update ticket:", err);
			});
	}

	useEffect(() => {
		refreshTicket();
	}, [id]);

	if (loading) return <p class="p-6 text-sm text-gray-500 dark:text-gray-300">Loading ticket...</p>;
	if (error) return <p class="p-6 text-red-500">{error}</p>;
	if (!ticket) return <p class="p-6 text-gray-500 dark:text-gray-300">Ticket not found.</p>;

	return (
		<main>
			<div class="mb-6">
				<a href="/tickets" class="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-gray-100 hover:underline">← Back to dashboard</a>
			</div>
			<div class="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-2xl mx-auto">
				<TicketDetails ticket={ticket} notes={notes} onAction={handleAction} />
			</div>
		</main>
	);
}