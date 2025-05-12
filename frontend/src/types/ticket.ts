export type Note = {
	id: number;
	text: string;
	created_at: string;
};

export type TicketType = {
	id: string;
	issue: string;
	details: string;
	status: 'open' | 'resolved';
	escalated: boolean;
	created_at: string;
	notes?: Note[];
};

export type TicketActionType = 'resolve' | 'reopen' | 'escalate' | 'note';

export type TicketActionHandler = (type: TicketActionType, note?: string) => void;