import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import axios from 'axios';
import type { TicketType } from '../../types/ticket.js';
import { TicketDetails } from '../../components/Tickets/TicketDetails.js';

export function TicketDetailsPage() {
	const { params } = useRoute();
	const id = params.id;
	const [ticket, setTicket] = useState<TicketType | null>(null);

	useEffect(() => {
		axios.get(`/api/tickets.php?id=${id}`).then((res) => {
			setTicket(res.data);
		});
	}, [id]);

	return (
		<main>
			<div class="mb-6">
				<a href="/tickets">← Back to dashboard</a>
			</div>
			<div class="bg-white p-4 rounded shadow max-w-2xl mx-auto">
			<TicketDetails ticket={ticket} />
			</div>
		</main>
	);
}