[@listener-js/imp](../README.md) › [Globals](../globals.md) › ["imp"](../modules/_imp_.md) › [Imp](_imp_.imp.md)

# Class: Imp

## Hierarchy

* **Imp**

## Index

### Properties

* [instances](_imp_.imp.md#private-instances)
* [listeners](_imp_.imp.md#listeners)
* [promises](_imp_.imp.md#private-promises)
* [resolvers](_imp_.imp.md#private-resolvers)

### Methods

* [externalCallbacks](_imp_.imp.md#private-externalcallbacks)
* [externalLoad](_imp_.imp.md#private-externalload)
* [externalPromises](_imp_.imp.md#private-externalpromises)
* [listenerInit](_imp_.imp.md#listenerinit)
* [listenerReset](_imp_.imp.md#listenerreset)

## Properties

### `Private` instances

• **instances**: *Record‹string, any›*

Defined in imp.ts:6

___

###  listeners

• **listeners**: *string[]* =  ["externalLoad"]

Defined in imp.ts:4

___

### `Private` promises

• **promises**: *Record‹string, Promise‹any››*

Defined in imp.ts:7

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in imp.ts:8

## Methods

### `Private` externalCallbacks

▸ **externalCallbacks**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›[]*

Defined in imp.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›[]*

___

### `Private` externalLoad

▸ **externalLoad**(`id`: string[], `instanceId`: string, `instance`: any, `instances`: Record‹string, any›, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›*

Defined in imp.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`instances` | Record‹string, any› |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›*

___

### `Private` externalPromises

▸ **externalPromises**(`instanceId`: string, `instance`: any, `listener`: Listener): *Promise‹any›[]*

Defined in imp.ts:142

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *Promise‹any›[]*

___

###  listenerInit

▸ **listenerInit**(`id`: string[], `instanceId`: string, `instance`: any, `instances`: Record‹string, any›, `listener`: Listener): *void*

Defined in imp.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`instances` | Record‹string, any› |
`listener` | Listener |

**Returns:** *void*

___

###  listenerReset

▸ **listenerReset**(): *void*

Defined in imp.ts:33

**Returns:** *void*
