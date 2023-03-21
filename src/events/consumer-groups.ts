export enum ConsumerGroups {
  Ticketing = 'ticketing',
  Payments = 'payments',
  Expiration = 'expiration',
  Orders = 'orders',
}

export enum Ticketing {
  OrdersListener = 'orders-listener',
}

export enum Payments {}

export enum Expiration {
  OrdersListener = 'orders-listener',
}

export enum Orders {
  ExpirationListener = 'expiration-listener',
  TicketsListener = 'tickets-listener',
}
