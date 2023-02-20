import { ConsumerGroups } from '../consumer-groups';
export interface ITicketCreatedEvent {
    consumerGroup: ConsumerGroups.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
