export enum ConsumerGroups {
  TicketCreated = 'ticket-created',
  TicketUpdated = 'ticket-updated',
  OrderCreated = 'order-created',
  OrderCancelled = 'order-cancelled',
  // ExpirationComplete = 'expiration-complete',
  // PaymentCreated = 'payment-created',
}

export enum PartitionKeys {
  TicketCreated = 'ticket-created',
  TicketUpdated = 'ticket-updated',
  OrderCreated = 'order-created',
  OrderCancelled = 'order-cancelled',
  // ExpirationComplete = 'expiration-complete',
  // PaymentCreated = 'payment-created',
}
