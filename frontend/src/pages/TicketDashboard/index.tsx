import { Ticket } from '../../components/Ticket.js';
import { TicketType } from '../../types/ticket.js';

type TicketDashboardProps = {
	tickets: TicketType[];
};

export function TicketDashboard({ tickets }: TicketDashboardProps) {
	return (
		<div>
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
		</div>
	);
}