import { EventHubConsumerClient, EventData, ReceivedEventData, PartitionContext } from '@azure/event-hubs';
import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';
interface Event {
    data: any;
    subject: ConsumerGroups;
    consumerGroup: ConsumerGroups;
}
declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], context: PartitionContext, event: ReceivedEventData): void;
    abstract eventHubName: EventHubs;
    abstract consumerGroup: T['consumerGroup'];
    private baseUrl;
    private credential;
    private checkpointStore;
    private client;
    constructor(eventHubName: EventHubs, consumerGroup: T['consumerGroup']);
    protected setConsumerClient(eventHubName: EventHubs, consumerGroup: T['consumerGroup']): EventHubConsumerClient;
    parseMessage(event: EventData): any;
    listen(): Promise<void>;
}
export { Listener };