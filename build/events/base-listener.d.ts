import { EventData, ReceivedEventData, PartitionContext } from '@azure/event-hubs';
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
    private hubsCredentialString;
    private storageCredentialString;
    private containerName;
    private containerClient;
    private checkpointStore;
    private client;
    constructor(eventHubName: EventHubs, consumerGroup: T['consumerGroup']);
    private setConsumerClient;
    parseMessage(event: EventData): any;
    listen(): Promise<void>;
}
export { Listener };
