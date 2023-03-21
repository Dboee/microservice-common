import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';
import { Subjects } from '../types/subjects';

export interface ITicketUpdatedEvent {
  properties: {
    subject: Subjects.TicketUpdated;
  };
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
