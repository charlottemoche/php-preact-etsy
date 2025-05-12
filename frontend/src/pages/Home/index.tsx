import { TicketDashboard } from "../TicketDashboard";
import { useEffect, useState } from 'preact/hooks';
import { TicketType } from '../../types/ticket.js';
import axios from 'axios';

export function Home() {
	const [tickets, setTickets] = useState<TicketType[]>([]);

	useEffect(() => {
		fetchTickets()
	}, []);

	function fetchTickets() {
		axios.get('/api/tickets.php')
		.then((res) => {
			setTickets(res.data)
		})
		.catch((err) => {
			console.error("Error fetching tickets:", err);
		})
	}
	
	return (
		<main class="min-h-screen bg-gray-50 p-6 font-sans">
			<header class="mb-6">
				<h1 class="text-2xl font-bold text-gray-800">Ticket Dashboard</h1>
			</header>

			<TicketDashboard tickets={tickets} />
		</main>
	);
}
