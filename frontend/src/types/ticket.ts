export type TicketType = {
  id: string;
  issue: string;
  details: string;
  status: 'open' | 'resolved';
  escalated: boolean;
  notes: string[];
  created_at: string;
};

export type TicketActionType = 'resolve' | 'escalate' | 'note';

export type TicketActionHandler = (type: TicketActionType) => void;