import { Ticket } from '../../components/Ticket.jsx';
import { useRoute } from 'preact-iso'

const tickets = [
    { orderId: '1234', issue: 'Item not delivered', details: 'More details here, click the ticket to see all details.' },
    { orderId: '5678', issue: 'Refund request denied', details: 'More details here, click the ticket to see all details. This is a longer set of details and there will be a character count and an ellipses.' },
];

export function TicketDashboard() {

    const route = useRoute();
    const ticketId = route.params?.id;
    const selected = tickets.find((t) => t.orderId === ticketId);

    return (
        <div>
            <section class="bg-white p-4 rounded shadow max-w-xl">
                <h2 class="text-lg font-semibold mb-2">Open Support Tickets</h2>
                <ul class="space-y-3">
                    {tickets.map((ticket) => (
                        <Ticket
                            key={ticket.orderId}
                            orderId={ticket.orderId}
                            issue={ticket.issue}
                            details={ticket.details}
                        />
                    ))}
                </ul>
            </section>

            {selected && (
                <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div class="bg-white p-6 rounded shadow max-w-md w-full relative">
                        <a
                            href="/"
                            class="absolute top-2 right-2 text-gray-500 hover:text-black text-sm"
                        >
                            ✕
                        </a>
                        <h3 class="text-xl font-bold mb-2">Order #{selected.orderId}</h3>
                        <p class="text-sm mb-1 font-medium">{selected.issue}</p>
                        <p class="text-sm text-gray-600">{selected.details}</p>
                    </div>
                </div>
            )}
        </div>
    )
}