import { EventHubProducerClient } from '@azure/event-hubs';
import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';
interface Event {
    consumerGroup: ConsumerGroups;
    eventHubName: EventHubs;
    data: any;
}
export declare abstract class Publisher<T extends Event> {
    abstract consumerGroup: T['consumerGroup'];
    abstract eventHubName: T['eventHubName'];
    private credentialString;
    private client;
    constructor(eventHubName: T['eventHubName'], consumerGroup: T['consumerGroup']);
    protected setConsumerClient(eventHubName: T['eventHubName'], consumerGroup: T['consumerGroup']): EventHubProducerClient;
    publish(data: T['data']): Promise<void>;
}
export {};
