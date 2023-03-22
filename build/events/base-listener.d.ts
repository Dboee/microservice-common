import { EventHubConsumerClient, EventData, ReceivedEventData, PartitionContext } from '@azure/event-hubs';
import { ConsumerGroups } from './consumer-groups';
import { Subjects } from './types/subjects';
interface Event {
    properties: {
        subject: Subjects;
    };
    data: any;
    consumerGroup: ConsumerGroups;
}
declare abstract class Listener<T extends Event> {
    abstract subject: T['data']['properties']['subject'];
    abstract consumerGroup: T['consumerGroup'];
    abstract onMessage(data: T['data'], context: PartitionContext, event: ReceivedEventData): void;
    protected client: EventHubConsumerClient;
    constructor(client: EventHubConsumerClient);
    parseMessage(event: EventData): any;
    private CustomProcessEvent;
    listen(): Promise<void>;
}
export { Listener };
