"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = exports.Expiration = exports.Payments = exports.Ticketing = exports.ConsumerGroups = void 0;
var ConsumerGroups;
(function (ConsumerGroups) {
    ConsumerGroups["Ticketing"] = "ticketing";
    ConsumerGroups["Payments"] = "payments";
    ConsumerGroups["Expiration"] = "expiration";
    ConsumerGroups["Orders"] = "orders";
})(ConsumerGroups = exports.ConsumerGroups || (exports.ConsumerGroups = {}));
var Ticketing;
(function (Ticketing) {
    Ticketing["OrdersListener"] = "orders-listener";
})(Ticketing = exports.Ticketing || (exports.Ticketing = {}));
var Payments;
(function (Payments) {
})(Payments = exports.Payments || (exports.Payments = {}));
var Expiration;
(function (Expiration) {
    Expiration["OrdersListener"] = "orders-listener";
})(Expiration = exports.Expiration || (exports.Expiration = {}));
var Orders;
(function (Orders) {
    Orders["ExpirationListener"] = "expiration-listener";
    Orders["TicketsListener"] = "tickets-listener";
})(Orders = exports.Orders || (exports.Orders = {}));
