"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionKeys = exports.ConsumerGroups = void 0;
var ConsumerGroups;
(function (ConsumerGroups) {
    ConsumerGroups["TicketCreated"] = "ticket-created";
    ConsumerGroups["TicketUpdated"] = "ticket-updated";
    ConsumerGroups["OrderCreated"] = "order-created";
    ConsumerGroups["OrderCancelled"] = "order-cancelled";
    // ExpirationComplete = 'expiration-complete',
    // PaymentCreated = 'payment-created',
})(ConsumerGroups = exports.ConsumerGroups || (exports.ConsumerGroups = {}));
var PartitionKeys;
(function (PartitionKeys) {
    PartitionKeys["TicketCreated"] = "ticket-created";
    PartitionKeys["TicketUpdated"] = "ticket-updated";
    PartitionKeys["OrderCreated"] = "order-created";
    PartitionKeys["OrderCancelled"] = "order-cancelled";
    // ExpirationComplete = 'expiration-complete',
    // PaymentCreated = 'payment-created',
})(PartitionKeys = exports.PartitionKeys || (exports.PartitionKeys = {}));
