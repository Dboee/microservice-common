import { EventHubProducerClient } from '@azure/event-hubs';
import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';
interface Event {
    consumerGroup: ConsumerGroups;
    data: any;
}
export declare abstract class Publisher<T extends Event> {
    abstract consumerGroup: T['consumerGroup'];
    abstract eventHubName: EventHubs;
    private credential;
    private client;
    constructor(eventHubName: EventHubs, consumerGroup: T['consumerGroup']);
    protected setConsumerClient(eventHubName: EventHubs, consumerGroup: T['consumerGroup']): EventHubProducerClient;
    publish(data: T['data']): Promise<void>;
}
export {};
