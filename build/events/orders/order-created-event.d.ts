import { Subjects } from '../types/subjects';
export interface IOrderCreatedEvent {
    properties: {
        subject: Subjects.OrderCreated;
    };
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
