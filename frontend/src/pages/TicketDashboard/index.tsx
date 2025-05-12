import { Ticket } from '../../components/Tickets/Ticket.js';
import { TicketType } from '../../types/ticket.js';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

export function TicketDashboard() {
	const [tickets, setTickets] = useState<TicketType[]>([]);

	useEffect(() => {
		fetchTickets();
	}, []);

	function fetchTickets() {
		axios.get('/api/tickets.php')
			.then((res) => {
				setTickets(res.data);
			})
			.catch((err) => {
				console.error("Error fetching tickets:", err);
			});
	}

	return (
		<main>
			<header class="mb-6">
				<h1 class="text-2xl font-bold text-gray-800">Ticket Dashboard</h1>
			</header>
			<section class="bg-white p-4 rounded shadow max-w-xl">
				<h2 class="text-lg font-semibold mb-2">Open Support Tickets</h2>
				<ul class="space-y-4">
					{tickets.map((ticket) => (
						<Ticket
							key={ticket.orderId}
							id={ticket.orderId}
							issue={ticket.issue}
							details={ticket.details}
						/>
					))}
				</ul>
			</section>
		</main>
	);
}