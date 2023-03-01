import { EventHubs } from '../event-hubs';
import { ConsumerGroups } from '../consumer-groups';
export interface IOrderCancelledEvent {
    consumerGroup: ConsumerGroups.OrderCancelled;
    eventHubName: EventHubs.Orders;
    data: {
        id: string;
        ticket: {
            id: string;
        };
    };
}
