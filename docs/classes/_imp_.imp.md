[imp](../README.md) › [Globals](../globals.md) › ["imp"](../modules/_imp_.md) › [Imp](_imp_.imp.md)

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

* [callbackPromises](_imp_.imp.md#private-callbackpromises)
* [externalInit](_imp_.imp.md#private-externalinit)
* [externalLoad](_imp_.imp.md#private-externalload)
* [externalPromises](_imp_.imp.md#private-externalpromises)
* [listenerInit](_imp_.imp.md#listenerinit)
* [listenerReset](_imp_.imp.md#listenerreset)

## Properties

### `Private` instances

• **instances**: *Record‹string, any›*

Defined in imp.ts:11

___

###  listeners

• **listeners**: *string[]* =  [
    "externalInit",
    "externalLoad",
    "listenerInit",
    "listenerReset",
  ]

Defined in imp.ts:4

___

### `Private` promises

• **promises**: *Record‹string, Promise‹any››*

Defined in imp.ts:12

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in imp.ts:13

## Methods

### `Private` callbackPromises

▸ **callbackPromises**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›[]*

Defined in imp.ts:113

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

### `Private` externalInit

▸ **externalInit**(`id`: string[], `instanceId`: string, `instance`: any): *void*

Defined in imp.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

### `Private` externalLoad

▸ **externalLoad**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›*

Defined in imp.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›*

___

### `Private` externalPromises

▸ **externalPromises**(`instanceId`: string, `instance`: any, `listener`: Listener): *Promise‹any›[]*

Defined in imp.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *Promise‹any›[]*

___

###  listenerInit

▸ **listenerInit**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener): *void*

Defined in imp.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *void*

___

###  listenerReset

▸ **listenerReset**(): *void*

Defined in imp.ts:34

**Returns:** *void*