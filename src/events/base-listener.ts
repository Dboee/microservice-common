import {
  EventHubConsumerClient,
  earliestEventPosition,
  EventData,
  ReceivedEventData,
  PartitionContext,
} from '@azure/event-hubs';
import { ContainerClient } from '@azure/storage-blob';
import { BlobCheckpointStore } from '@azure/eventhubs-checkpointstore-blob';

import { ConsumerGroups } from './consumer-groups';
import { EventHubs } from './event-hubs';
import { Subjects } from './types/subjects';

interface Event {
  properties: {
    subject: Subjects;
  };
  data: any;
  consumerGroup: ConsumerGroups;
}

// An abstract class in TypeScript is a class that cannot be
// instantiated directly. It can only be used as a base class for other classes.
abstract class Listener<T extends Event> {
  // These abstract properties must be defined in the child class
  abstract subject: T['data']['properties']['subject'];
  abstract consumerGroup: T['consumerGroup'];
  abstract onMessage(
    data: T['data'],
    context: PartitionContext,
    event: ReceivedEventData
  ): void;

  protected client: EventHubConsumerClient;

  // The constructor is called when the class is instantiated
  constructor(client: EventHubConsumerClient) {
    // sets the client property
    this.client = client;
  }

  // Method to parse the event data into a JSON object
  parseMessage(event: EventData) {
    const data = event.body;
    return data;
  }
  // Method to process the event data
  private async CustomProcessEvent(
    event: ReceivedEventData,
    context: PartitionContext
  ) {
    const subject = event.properties?.subject;

    if (!subject || subject !== this.consumerGroup) {
      // Skip processing if consumer group doesn't match
      console.log(
        `Skipping event with subject: ${subject} and consumer group: ${this.consumerGroup}`
      );
      return;
    }

    const parsedData = this.parseMessage(event);
    await this.onMessage(parsedData, context, event);

    // Acknowledge the event
    // await context.updateCheckpoint(event);
  }

  // Define a method that can be called to start the listener
  async listen() {
    console.log('Listener conntected to:', this.consumerGroup);
    this.client.subscribe(
      {
        processEvents: async (events, context) => {
          for (const event of events) {
            await this.CustomProcessEvent(event, context);
          }
        },
        processError: async (err, context) => {
          console.log(`Subscription processError : ${err}`);
        },
      },
      { startPosition: { '1': earliestEventPosition } }
    );
  }
}

export { Listener };
