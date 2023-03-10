// Import the event hubs namespace
import { EventHubs } from '../event-hubs';
// Import the consumer group for this event
import { ConsumerGroups } from '../consumer-groups';

// Define the event type
export interface IOrderCancelledEvent {
  // Define the consumer group
  consumerGroup: ConsumerGroups.OrderCancelled;
  // Define the event hub
  eventHubName: EventHubs.Orders;
  // Define the data payload
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
