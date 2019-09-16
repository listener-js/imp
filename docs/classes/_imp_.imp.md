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
* [externalPromises](_imp_.imp.md#private-externalpromises)
* [initExternal](_imp_.imp.md#initexternal)
* [listenerInit](_imp_.imp.md#listenerinit)
* [loadExternal](_imp_.imp.md#loadexternal)

## Properties

### `Private` instances

• **instances**: *Record‹string, any›*

Defined in imp.ts:10

___

###  listeners

• **listeners**: *string[]* =  [
    "initExternal",
    "listenerInit",
    "loadExternal",
  ]

Defined in imp.ts:4

___

### `Private` promises

• **promises**: *Record‹string, Promise‹any››*

Defined in imp.ts:11

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in imp.ts:12

## Methods

### `Private` callbackPromises

▸ **callbackPromises**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›[]*

Defined in imp.ts:112

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

### `Private` externalPromises

▸ **externalPromises**(`instanceId`: string, `instance`: any, `listener`: Listener): *Promise‹any›[]*

Defined in imp.ts:149

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *Promise‹any›[]*

___

###  initExternal

▸ **initExternal**(`id`: string[], `instanceId`: string, `instance`: any): *void*

Defined in imp.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

###  listenerInit

▸ **listenerInit**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener): *void*

Defined in imp.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *void*

___

###  loadExternal

▸ **loadExternal**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›*

Defined in imp.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›*