import { Subjects } from '../types/subjects';
export interface ITicketCreatedEvent {
    data: {
        id: string;
        version: number;
        title: string;
        price: number;
        userId: string;
        orderId?: string;
        properties: {
            subject: Subjects.TicketCreated;
        };
    };
}
