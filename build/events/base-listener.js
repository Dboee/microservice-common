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
const event_hubs_1 = require("@azure/event-hubs");
// An abstract class in TypeScript is a class that cannot be
// instantiated directly. It can only be used as a base class for other classes.
class Listener {
    // The constructor is called when the class is instantiated
    constructor(client) {
        // sets the client property
        this.client = client;
        // Client Setup
        // if (!process.env.LISTEN_KEY)
        //   throw new Error('LISTEN_KEY is not available in the environment');
        // this.hubsCredentialString = process.env.LISTEN_KEY;
        // if (!process.env.STORAGE_KEY)
        //   throw new Error('STORAGE_KEY is not available in the environment');
        // this.storageCredentialString = process.env.STORAGE_KEY;
        // this.containerName = 'eventhub-container'; // Get this from Azure Portal
        // this.containerClient = new ContainerClient(
        //   this.storageCredentialString,
        //   this.containerName
        // );
        // this.checkpointStore = new BlobCheckpointStore(this.containerClient);
        // this.client = this.setConsumerClient(eventHubName, consumerGroup);
    }
    // private setConsumerClient(
    //   eventHubName: T['eventHubName'],
    //   consumerGroup: T['consumerGroup']
    // ) {
    //   return new EventHubConsumerClient(
    //     consumerGroup,
    //     this.hubsCredentialString,
    //     eventHubName,
    //     this.checkpointStore
    //   );
    // }
    // Method to parse the event data into a JSON object
    parseMessage(event) {
        const data = event.body;
        return data;
    }
    // Method to process the event data
    CustomProcessEvent(event, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const subject = (_a = event.properties) === null || _a === void 0 ? void 0 : _a.subject;
            if (!subject || subject !== this.consumerGroup) {
                // Skip processing if consumer group doesn't match
                console.log(`Skipping event with subject: ${subject} and consumer group: ${this.consumerGroup}`);
                return;
            }
            const parsedData = this.parseMessage(event);
            yield this.onMessage(parsedData, context, event);
        });
    }
    // Define a method that can be called to start the listener
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Listener conntected to:', this.consumerGroup);
            this.client.subscribe({
                processEvents: (events, context) => __awaiter(this, void 0, void 0, function* () {
                    for (const event of events) {
                        yield this.CustomProcessEvent(event, context);
                    }
                }),
                processError: (err, context) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Subscription processError : ${err}`);
                }),
            }, { startPosition: { '1': event_hubs_1.earliestEventPosition } });
        });
    }
}
exports.Listener = Listener;
