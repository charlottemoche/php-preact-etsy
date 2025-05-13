import type { TicketInfoProps } from '../../types/ticket.js';

export function TicketInfo({ ticket, showFullDetails = false }: TicketInfoProps) {
    const createdDate = new Date(ticket.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const updatedDate = new Date(ticket.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const dateText = showFullDetails
        ? `Created on ${createdDate} – Last updated ${updatedDate}`
        : `Created on ${createdDate}`;

    const Wrapper = ({ children }) =>
        showFullDetails ? (
            <div>{children}</div>
        ) : (
            <a href={`/tickets/${ticket.id}`} class="block w-full hover:bg-gray-100 dark:hover:bg-dark p-3">
                {children}
            </a>
        );

        return (
        <Wrapper>
            <span class="font-medium">{`Order #${ticket.id} – “${ticket.issue}”`}</span>
            <div class="text-xs text-gray-500 dark:text-gray-300 mt-1">
                {dateText}
            </div>
            <div class="pt-6 text-sm italic text-gray-600 dark:text-gray-400 truncate">
                {ticket.details}
            </div>
        </Wrapper>
    );
}