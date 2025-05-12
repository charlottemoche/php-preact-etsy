export type TicketType = {
  id: string;
  issue: string;
  details: string;
  status: 'open' | 'resolved';
  escalated: boolean;
  notes: string[];
};
