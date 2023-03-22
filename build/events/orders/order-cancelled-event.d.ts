import { Subjects } from '../types/subjects';
export interface IOrderCancelledEvent {
    properties: {
        subject: Subjects.OrderCancelled;
    };
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
}
