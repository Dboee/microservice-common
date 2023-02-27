import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';
export interface ITicketUpdatedEvent {
    consumerGroup: ConsumerGroups.TicketUpdated;
    eventHub: EventHubs.Tickets;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
