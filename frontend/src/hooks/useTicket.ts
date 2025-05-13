import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';
import type { TicketType, Note } from '../types/ticket.js';

export function useTicket(id: string) {
	const [ticket, setTicket] = useState<TicketType | null>(null);
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const refresh = async () => {
		try {
			const [ticketRes, notesRes] = await Promise.all([
				axios.get(`/api/tickets/${id}`),
				axios.get(`/api/tickets/${id}/notes`),
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

	useEffect(() => {
		refresh();
	}, [id]);

	return { ticket, notes, loading, error, refresh };
}