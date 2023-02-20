import { ConsumerGroups } from '../consumer-groups';

export interface ITicketUpdatedEvent {
  consumerGroup: ConsumerGroups.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
