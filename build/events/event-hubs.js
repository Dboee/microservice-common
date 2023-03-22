"use strict";
// Event Hub (Azure Event Hubs) / Subject (NATS):
// A stream of events, which can be hierarchical in NATS,
// and defines the topic of the message.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = exports.EventHubs = void 0;
var EventHubs;
(function (EventHubs) {
    EventHubs["Payments"] = "payments-service";
    EventHubs["Tickets"] = "ticketing-service";
    EventHubs["Orders"] = "orders-service";
    EventHubs["Expiration"] = "expiration-service";
})(EventHubs = exports.EventHubs || (exports.EventHubs = {}));
var EventTypes;
(function (EventTypes) {
    EventTypes["TicketCreated"] = "ticket-created";
    EventTypes["TicketUpdated"] = "ticket-updated";
    EventTypes["OrderCreated"] = "order-created";
    EventTypes["OrderCancelled"] = "order-cancelled";
    EventTypes["ExpirationComplete"] = "expiration-complete";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
