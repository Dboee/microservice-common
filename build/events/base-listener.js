"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const identity_1 = require("@azure/identity");
const event_hubs_1 = require("@azure/event-hubs");
const storage_blob_1 = require("@azure/storage-blob");
const eventhubs_checkpointstore_blob_1 = require("@azure/eventhubs-checkpointstore-blob");
const EVENT_HUBS_RESOURCE_NAME = 'microservice-namespace';
const STORAGE_ACCOUNT_NAME = 'microservicestorageacc';
const STORAGE_CONTAINER_NAME = 'eventhub-container';
// An abstract class in TypeScript is a class that cannot be
// instantiated directly. It can only be used as a base class for other classes.
class Listener {
    // The constructor is called when the class is instantiated
    constructor(eventHubName, consumerGroup) {
        console.clear();
        // Initialize the properties when the class is instantiated
        this.baseUrl = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`;
        this.credential = new identity_1.DefaultAzureCredential();
        this.checkpointStore = new eventhubs_checkpointstore_blob_1.BlobCheckpointStore(new storage_blob_1.ContainerClient(`${this.baseUrl}/${STORAGE_CONTAINER_NAME}`, this.credential));
        this.client = this.setConsumerClient(eventHubName, consumerGroup);
    }
    // protected member is accessible from the class
    // itself and its subclasses but not from the outside world
    setConsumerClient(eventHubName, consumerGroup) {
        return new event_hubs_1.EventHubConsumerClient(consumerGroup, `${EVENT_HUBS_RESOURCE_NAME}.servicebus.windows.net`, eventHubName, this.credential, this.checkpointStore
        // configures the client to receive events from a specific partition
        // { partitionId: this.partition }
        );
    }
    // Method to parse the event data into a JSON object
    parseMessage(event) {
        const data = event.body;
        return data;
    }
    // Define a method that can be called to start the listener
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Listener conntected to Azure Event Hub');
            const subscription = this.client.subscribe({
                processEvents: (events, context) => __awaiter(this, void 0, void 0, function* () {
                    if (events.length === 0)
                        return console.log('No events to process.');
                    for (const event of events) {
                        const parsedData = this.parseMessage(event);
                        this.onMessage(parsedData, context, event);
                    }
                    yield context.updateCheckpoint(events[events.length - 1]);
                }),
                processError: (err, context) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Subscription processError : ${err}`);
                }),
            }, { startPosition: { '1': event_hubs_1.earliestEventPosition } });
        });
    }
}
exports.Listener = Listener;
