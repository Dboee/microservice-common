import { EventData, ReceivedEventData, PartitionContext } from '@azure/event-hubs';
import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';
interface Event {
    data: any;
    eventHubName: EventHubs;
    consumerGroup: ConsumerGroups;
}
declare abstract class Listener<T extends Event> {
    abstract onMessage(data: T['data'], context: PartitionContext, event: ReceivedEventData): void;
    abstract eventHubName: T['eventHubName'];
    abstract consumerGroup: T['consumerGroup'];
    private hubsCredentialString;
    private storageCredentialString;
    private containerName;
    private containerClient;
    private checkpointStore;
    private client;
    constructor(eventHubName: T['eventHubName'], consumerGroup: T['consumerGroup']);
    private setConsumerClient;
    parseMessage(event: EventData): any;
    private CustomProcessEvent;
    listen(): Promise<void>;
}
export { Listener };
