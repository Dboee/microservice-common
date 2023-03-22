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
class Publisher {
    constructor(client) {
        // sets the client property
        this.client = client;
    }
    // Publishes an event to the event hub
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a batch object.
            const batch = yield this.client.createBatch();
            // Create an message(event) object.
            const message = {
                body: data,
                properties: {
                    subject: this.subject,
                },
            };
            // Validates that the message has properties and a subject.
            if (!message.properties)
                throw new Error('No property defined in event');
            if (!message.properties.subject)
                throw new Error('No subject defined in event');
            // Add the message to the batch.
            batch.tryAdd(message);
            // Send the batch to the event hub.
            try {
                yield this.client.sendBatch(batch);
            }
            catch (error) {
                console.error(error);
                throw new Error(error);
            }
            // Console logs the plublished event
            console.log(`Event Published:`, message);
            // Close the producer client.
            yield this.client.close();
        });
    }
}
exports.Publisher = Publisher;
