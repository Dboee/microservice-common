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
exports.Publisher = void 0;
const event_hubs_1 = require("@azure/event-hubs");
const EVENT_HUBS_RESOURCE_NAME = 'microservice-namespace';
class Publisher {
    constructor(eventHubName, consumerGroup) {
        // Client Setup
        this.eventHubsResourceName = EVENT_HUBS_RESOURCE_NAME;
        // this.fullyQualifiedNamespace = `${this.eventHubsResourceName}.servicebus.windows.net`;
        if (!process.env.PUBLISH_KEY)
            throw new Error('No publish key defined in environment variables');
        this.credential = process.env.PUBLISH_KEY;
        // this.credential = new DefaultAzureCredential();
        this.client = this.setConsumerClient(eventHubName, consumerGroup);
    }
    setConsumerClient(eventHubName, consumerGroup) {
        return new event_hubs_1.EventHubProducerClient(
        // this.fullyQualifiedNamespace,
        this.credential, eventHubName);
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = yield this.client.createBatch();
            const message = {
                body: data,
                properties: {
                    consumerGroup: this.consumerGroup,
                },
            };
            if (!message.properties)
                throw new Error('No property defined in event');
            if (!message.properties.consumerGroup)
                throw new Error('No consumerGroup defined in event');
            batch.tryAdd(message);
            try {
                yield this.client.sendBatch(batch);
            }
            catch (error) {
                console.error(error);
                throw new Error(error);
            }
            // Close the producer client.
            yield this.client.close();
            console.log(`Event Published to ${this.eventHubName}:${message.properties.consumerGroup}`);
        });
    }
}
exports.Publisher = Publisher;
