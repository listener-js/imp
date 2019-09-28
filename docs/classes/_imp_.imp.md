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
* [externalCallbacks](_imp_.imp.md#private-externalcallbacks)
* [externalPromises](_imp_.imp.md#private-externalpromises)
* [listenerBind](_imp_.imp.md#listenerbind)
* [listenerReset](_imp_.imp.md#listenerreset)

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

Defined in imp.ts:49

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

Defined in imp.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void*

___

### `Private` externalCallbacks

▸ **externalCallbacks**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any›[]*

Defined in imp.ts:113

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
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

###  listenerBind

▸ **listenerBind**(`lid`: string[], `instanceId`: string): *ListenerBind*

Defined in imp.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |

**Returns:** *ListenerBind*

___

###  listenerReset

▸ **listenerReset**(`lid`: string[]): *void*

Defined in imp.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
