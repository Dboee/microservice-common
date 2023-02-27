import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';
export interface ITicketCreatedEvent {
    consumerGroup: ConsumerGroups.TicketCreated;
    eventHub: EventHubs.Tickets;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
