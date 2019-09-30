[@listener-js/join](../README.md) › [Globals](../globals.md) › ["join"](../modules/_join_.md) › [Join](_join_.join.md)

# Class: Join

## Hierarchy

* **Join**

## Index

### Properties

* [joins](_join_.join.md#private-joins)
* [promises](_join_.join.md#private-promises)
* [resolvers](_join_.join.md#private-resolvers)

### Methods

* [anyInstanceLoaded](_join_.join.md#private-anyinstanceloaded)
* [buildPromise](_join_.join.md#private-buildpromise)
* [instanceJoined](_join_.join.md#private-instancejoined)
* [instancesJoined](_join_.join.md#private-instancesjoined)
* [listenerBind](_join_.join.md#private-listenerbind)
* [parseId](_join_.join.md#parseid)
* [promise](_join_.join.md#private-promise)
* [readJoins](_join_.join.md#private-readjoins)
* [waitForPromises](_join_.join.md#private-waitforpromises)

## Properties

### `Private` joins

• **joins**: *Record‹string, string[][]›*

Defined in join.ts:7

___

### `Private` promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:8

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:9

## Methods

### `Private` anyInstanceLoaded

▸ **anyInstanceLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*

___

### `Private` buildPromise

▸ **buildPromise**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*

___

### `Private` instanceJoined

▸ **instanceJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:102

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

### `Private` instancesJoined

▸ **instancesJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:71

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

Defined in join.ts:120

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |

**Returns:** *ListenerBind*

___

###  parseId

▸ **parseId**(`id`: string, `listener`: Listener): *[string, string]*

Defined in join.ts:112

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:153

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` readJoins

▸ **readJoins**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:161

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*

___

### `Private` waitForPromises

▸ **waitForPromises**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:203

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*
