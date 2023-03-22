import { EventHubProducerClient } from '@azure/event-hubs';
import { Subjects } from './types/subjects';
interface EventInterface {
    data: {
        properties: {
            subject: Subjects;
        };
    };
}
export declare abstract class Publisher<T extends EventInterface> {
    abstract subject: T['data']['properties']['subject'];
    protected client: EventHubProducerClient;
    constructor(client: EventHubProducerClient);
    publish(data: T['data']): Promise<void>;
}
export {};
