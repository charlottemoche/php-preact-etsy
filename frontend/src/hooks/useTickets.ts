import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import type { TicketType } from '../types/ticket.js';

type UseTicketsOptions = {
	filter: 'all' | 'open' | 'resolved';
	queryKey: number;
};

export function useTickets({ filter, queryKey }: UseTicketsOptions) {
	const [tickets, setTickets] = useState<TicketType[]>([]);
	const [hasFetched, setHasFetched] = useState(false);

	const fetchTickets = () => {
		const url = filter === 'all'
			? '/api/tickets'
			: `/api/tickets?status=${filter}`;

		axios
			.get(url)
			.then((res) => {
				setTickets(res.data);
				setHasFetched(true);
			})
			.catch((err) => {
				console.error('Error fetching tickets:', err);
			});
	};

	useEffect(() => {
		setHasFetched(false);
		fetchTickets();
	}, [filter, queryKey]);

	return { tickets, hasFetched, fetchTickets };
}