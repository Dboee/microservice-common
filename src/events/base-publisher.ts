import { EventData, EventHubProducerClient } from '@azure/event-hubs';

import { EventHubs, EventTypes } from './event-hubs';
import { Subjects } from './types/subjects';

interface EventInterface {
  data: {
    properties: {
      subject: Subjects;
    };
  };
}

export abstract class Publisher<T extends EventInterface> {
  // Azure Spesific
  abstract subject: T['data']['properties']['subject'];
  // private credentialString: string;
  protected client: EventHubProducerClient;

  constructor(client: EventHubProducerClient) {
    // sets the client property
    this.client = client;
  }

  // Publishes an event to the event hub
  async publish(data: T['data']) {
    // Create a batch object.
    const batch = await this.client.createBatch();
    // Create an message(event) object.
    const message: EventData = {
      body: data,
      properties: {
        subject: this.subject,
      },
    };

    // Validates that the message has properties and a subject.
    if (!message.properties) throw new Error('No property defined in event');
    if (!message.properties.subject)
      throw new Error('No subject defined in event');
    // Add the message to the batch.
    batch.tryAdd(message);

    // Send the batch to the event hub.
    try {
      await this.client.sendBatch(batch);
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }

    // Console logs the plublished event
    console.log(`Event Published:`, message);
    // Close the producer client.
    await this.client.close();
  }
}
