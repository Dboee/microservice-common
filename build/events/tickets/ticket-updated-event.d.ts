import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';
export interface ITicketUpdatedEvent {
    consumerGroup: ConsumerGroups.TicketUpdated;
    eventHubName: EventHubs.Tickets;
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        userId: string;
        orderId?: string;
    };
}
