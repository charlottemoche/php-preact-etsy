import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { updateTicket } from '../../lib/updateTicket.js';
import { TicketDetails } from '../../components/Tickets/TicketDetails.js';
import type { TicketType, TicketActionType } from '../../types/ticket.js';
import type { Note } from '../../types/ticket.js';
import axios from 'axios';

export function TicketDetailsPage() {
	const { params } = useRoute();
	const id = params.id;
	const [ticket, setTicket] = useState<TicketType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [notes, setNotes] = useState<Note[]>([]);

	const refreshTicket = () => {
		axios.get(`/api/tickets.php?id=${id}`).then(res => setTicket(res.data));
		axios.get(`/api/notes.php?ticket_id=${id}`).then(res => setNotes(res.data));
	};

	function handleAction(type: TicketActionType, note?: string) {
		if (!ticket) return;

		if (type === 'note' && note) {
			axios.post('/api/notes.php', {
				ticket_id: ticket.id,
				text: note,
			})
				.then(refreshTicket)
				.catch((err) => {
					console.error("Failed to add note:", err);
				});
			return;
		}

		updateTicket({ ticket, action: type })
			.then(refreshTicket)
			.catch((err) => {
				console.error("Failed to update ticket:", err);
			});
	}

	useEffect(() => {
		const fetchTicket = async () => {
			try {
				const res = await axios.get(`/api/tickets.php?id=${id}`);
				setTicket(res.data);

				const noteRes = await axios.get(`/api/notes.php?ticket_id=${id}`);
				setNotes(noteRes.data);
			} catch (err) {
				setError("Could not load ticket.");
			} finally {
				setLoading(false);
			}
		};

		fetchTicket();
	}, [id]);

	if (loading) return <p class="p-6 text-sm text-gray-500">Loading ticket...</p>;
	if (error) return <p class="p-6 text-red-500">{error}</p>;
	if (!ticket) return <p class="p-6 text-gray-500">Ticket not found.</p>;

	return (
		<main>
			<div class="mb-6">
				<a href="/tickets" class="text-gray-800 hover:text-black hover:underline">← Back to dashboard</a>
			</div>
			<div class="bg-white p-4 rounded shadow max-w-2xl mx-auto">
				<TicketDetails ticket={ticket} notes={notes} onAction={handleAction} />
			</div>
		</main>
	);
}