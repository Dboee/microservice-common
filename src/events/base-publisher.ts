import { EventData, EventHubProducerClient } from '@azure/event-hubs';

import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';

interface Event {
  consumerGroup: ConsumerGroups;
  eventHubName: EventHubs;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract consumerGroup: T['consumerGroup'];

  // Azure Spesific
  abstract eventHubName: T['eventHubName'];
  private credentialString: string;

  private client: EventHubProducerClient;

  constructor(
    eventHubName: T['eventHubName'],
    consumerGroup: T['consumerGroup']
  ) {
    // Client Setup
    console.log('Publish Key: ', process.env.PUBLISH_KEY);
    console.log('Listen Key: ', process.env.LISTEN_KEY);
    if (!process.env.PUBLISH_KEY)
      throw new Error('No connection string defined for event hub');
    this.credentialString = process.env.PUBLISH_KEY;

    this.client = this.setConsumerClient(eventHubName, consumerGroup);
  }

  protected setConsumerClient(
    eventHubName: T['eventHubName'],
    consumerGroup: T['consumerGroup']
  ) {
    return new EventHubProducerClient(this.credentialString, eventHubName);
  }

  async publish(data: T['data']) {
    const batch = await this.client.createBatch();
    const message: EventData = {
      body: data,
      properties: {
        consumerGroup: this.consumerGroup,
      },
    };

    if (!message.properties) throw new Error('No property defined in event');
    if (!message.properties.consumerGroup)
      throw new Error('No consumerGroup defined in event');

    batch.tryAdd(message);

    try {
      await this.client.sendBatch(batch);
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }

    // Close the producer client.
    await this.client.close();

    console.log(
      `Event Published to ${this.eventHubName}:${message.properties.consumerGroup}`
    );
  }
}
