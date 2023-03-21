// Import the event hubs namespace
import { EventHubs } from '../event-hubs';
import { Subjects } from '../types/subjects';
// Import the consumer group for this event
import { ConsumerGroups } from '../consumer-groups';

// Define the event type
export interface IOrderCancelledEvent {
  // Define the properties
  properties: {
    // Define the subject
    subject: Subjects.OrderCancelled;
  };
  // Define the data payload
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
