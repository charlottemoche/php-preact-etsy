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
	updated_at: string;
	note_count?: number;
};

export type TicketProps = {
	ticket: TicketType;
	onAction: TicketActionHandler;
};

export type TicketDetailsProps = {
	ticket: TicketType;
	notes?: Note[];
	onAction: TicketActionHandler;
};

export type TicketInfoProps = {
	ticket: TicketType;
	notes?: Note[];
	showFullDetails?: boolean;
};

export type TicketActionType = 'resolve' | 'reopen' | 'escalate' | 'note';

export type TicketActionHandler = (type: TicketActionType, note?: string) => void;