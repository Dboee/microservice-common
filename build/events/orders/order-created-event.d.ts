import { ConsumerGroups } from '../consumer-groups';
import { EventHubs } from '../event-hubs';
export interface IOrderCreatedEvent {
    consumerGroup: ConsumerGroups.OrderCreated;
    eventHubName: EventHubs.Orders;
    data: {
        id: string;
        version: number;
        status: string;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string;
            price: number;
        };
    };
}
