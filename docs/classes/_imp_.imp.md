[@listener-js/imp](../README.md) › [Globals](../globals.md) › ["imp"](../modules/_imp_.md) › [Imp](_imp_.imp.md)

# Class: Imp

## Hierarchy

* **Imp**

## Index

### Properties

* [instances](_imp_.imp.md#private-instances)
* [promises](_imp_.imp.md#private-promises)
* [resolvers](_imp_.imp.md#private-resolvers)

### Methods

* [anyInstanceLoaded](_imp_.imp.md#private-anyinstanceloaded)
* [anyInstancesLoaded](_imp_.imp.md#private-anyinstancesloaded)
* [externalPromises](_imp_.imp.md#private-externalpromises)
* [instanceJoined](_imp_.imp.md#private-instancejoined)
* [listenerBind](_imp_.imp.md#private-listenerbind)
* [listenerReset](_imp_.imp.md#private-listenerreset)

## Properties

### `Private` instances

• **instances**: *Record‹string, any›*

Defined in imp.ts:7

___

### `Private` promises

• **promises**: *Record‹string, Promise‹any››*

Defined in imp.ts:8

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in imp.ts:9

## Methods

### `Private` anyInstanceLoaded

▸ **anyInstanceLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›*

Defined in imp.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›*

___

### `Private` anyInstancesLoaded

▸ **anyInstancesLoaded**(`lid`: string[], `instances`: Record‹string, any›): *void*

Defined in imp.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void*

___

### `Private` externalPromises

▸ **externalPromises**(`instanceId`: string, `instance`: any, `listener`: Listener): *Promise‹any›[]*

Defined in imp.ts:88

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |
`listener` | Listener |

**Returns:** *Promise‹any›[]*

___

### `Private` instanceJoined

▸ **instanceJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in imp.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerBind

▸ **listenerBind**(`lid`: string[], `instanceId`: string): *ListenerBind*

Defined in imp.ts:127

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |

**Returns:** *ListenerBind*

___

### `Private` listenerReset

▸ **listenerReset**(`lid`: string[]): *void*

Defined in imp.ts:160

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
