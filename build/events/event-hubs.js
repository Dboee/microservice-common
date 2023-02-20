"use strict";
// Event Hub (Azure Event Hubs) / Subject (NATS):
// A stream of events, which can be hierarchical in NATS,
// and defines the topic of the message.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHubs = void 0;
var EventHubs;
(function (EventHubs) {
    EventHubs["Payments"] = "payments-service";
    EventHubs["Tickets"] = "ticketing-service";
    EventHubs["Orders"] = "orders-service";
    EventHubs["Expiration"] = "expiration-service";
})(EventHubs = exports.EventHubs || (exports.EventHubs = {}));
