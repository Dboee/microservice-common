export declare enum ConsumerGroups {
    Ticketing = "ticketing",
    Payments = "payments",
    Expiration = "expiration",
    Orders = "orders"
}
export declare enum Ticketing {
    OrdersListener = "orders-listener"
}
export declare enum Payments {
}
export declare enum Expiration {
    OrdersListener = "orders-listener"
}
export declare enum Orders {
    ExpirationListener = "expiration-listener",
    TicketsListener = "tickets-listener"
}
