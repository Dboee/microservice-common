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

interface Event {
  data: any;
  eventHubName: EventHubs;
  consumerGroup: ConsumerGroups;
}

// An abstract class in TypeScript is a class that cannot be
// instantiated directly. It can only be used as a base class for other classes.
abstract class Listener<T extends Event> {
  // These abstract properties must be defined in the child class
  abstract onMessage(
    data: T['data'],
    context: PartitionContext,
    event: ReceivedEventData
  ): void;
  // Azure specific properties
  abstract eventHubName: T['eventHubName']; // Azure Event Hub name
  abstract consumerGroup: T['consumerGroup']; // Azure Event Hub consumer group

  // These properties are defined here
  private hubsCredentialString: string;
  private storageCredentialString: string;
  private containerName: string;
  private containerClient: ContainerClient;
  private checkpointStore: BlobCheckpointStore;
  private client: EventHubConsumerClient;

  // The constructor is called when the class is instantiated
  constructor(
    eventHubName: T['eventHubName'],
    consumerGroup: T['consumerGroup']
  ) {
    console.clear();

    // Client Setup
    if (!process.env.LISTEN_KEY)
      throw new Error('LISTEN_KEY is not available in the environment');
    this.hubsCredentialString = process.env.LISTEN_KEY;
    if (!process.env.STORAGE_KEY)
      throw new Error('STORAGE_KEY is not available in the environment');
    this.storageCredentialString = process.env.STORAGE_KEY;
    this.containerName = 'eventhub-container'; // Get this from Azure Portal

    this.containerClient = new ContainerClient(
      this.storageCredentialString,
      this.containerName
    );
    this.checkpointStore = new BlobCheckpointStore(this.containerClient);

    this.client = this.setConsumerClient(eventHubName, consumerGroup);
  }

  private setConsumerClient(
    eventHubName: T['eventHubName'],
    consumerGroup: T['consumerGroup']
  ) {
    return new EventHubConsumerClient(
      consumerGroup,
      this.hubsCredentialString,
      eventHubName,
      this.checkpointStore
    );
  }

  // Method to parse the event data into a JSON object
  parseMessage(event: EventData) {
    const data = event.body;
    return data;
  }

  // Define a method that can be called to start the listener
  async listen() {
    console.log(
      'Listener conntected to:',
      this.eventHubName,
      ' : ',
      this.consumerGroup
    );
    this.client.subscribe(
      {
        processEvents: async (events, context) => {
          if (events.length > 0) {
            for (const event of events) {
              const parsedData = this.parseMessage(event);
              this.onMessage(parsedData, context, event);
            }
            // Update the checkpoint
            await context.updateCheckpoint(events[events.length - 1]);
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
