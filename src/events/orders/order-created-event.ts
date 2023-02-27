import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';

export interface IOrderCreatedEvent {
  consumerGroup: ConsumerGroups.OrderCreated;
  eventHub: EventHubs.Orders;
  data: {
    id: string;
    status: string;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
