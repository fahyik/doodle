# vending-machine

Vending Machine Programme

## Getting Started

The command format must use the [sfs-framework](https://github.com/Spendesk/sfs-framework) to build the command objects.

In this format we make the distinction between technical fields :

- name
- commandId
- actor

And the data that is driven by the domain:

- metadata
- payload

```typescript
interface CreateCardCommand extends Command {
  name: "CreateCardCommand"; // The command name
  commandId: string; // The command id that will be used as idempotency key
  actor: string; // User id | Cron id | Webhook Id | ...
  metadata: any; // Represent the domain context of your command. example : distributorId
  payload: any; // Defined by your domain
}
```

## TODOs / Improvements

### Technical

- vending machine instance is ephemeral, use a data store to persist data
- updates to state and events in the Inventory and Bank objects should be transactional
- concurrent update to Inventory and Bank objects should also be transactional -> i.e. the sell action
- calculateChange() method can be further optimised

#### Features

- withdraw change from machine
- remove product from machine
- update price of product
- capacity for bank and inventory
