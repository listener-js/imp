[@listener-js/join](../README.md) › [Globals](../globals.md) › ["join"](../modules/_join_.md) › [Join](_join_.join.md)

# Class: Join

## Hierarchy

* **Join**

## Index

### Properties

* [id](_join_.join.md#id)
* [joins](_join_.join.md#joins)
* [promises](_join_.join.md#promises)
* [resolvers](_join_.join.md#private-resolvers)

### Methods

* [applyJoins](_join_.join.md#private-applyjoins)
* [buildPromise](_join_.join.md#private-buildpromise)
* [join](_join_.join.md#join)
* [listenerBeforeLoaded](_join_.join.md#private-listenerbeforeloaded)
* [listenerBeforeLoadedAny](_join_.join.md#private-listenerbeforeloadedany)
* [listenerJoined](_join_.join.md#private-listenerjoined)
* [listenerJoins](_join_.join.md#private-listenerjoins)
* [listenerReset](_join_.join.md#private-listenerreset)
* [listenersJoined](_join_.join.md#private-listenersjoined)
* [parseId](_join_.join.md#private-parseid)
* [promise](_join_.join.md#private-promise)
* [waitForPromises](_join_.join.md#private-waitforpromises)

## Properties

###  id

• **id**: *string*

Defined in join.ts:19

___

###  joins

• **joins**: *Record‹string, [ListenerJoins](../modules/_types_.md#listenerjoins)›*

Defined in join.ts:20

___

###  promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:21

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:23

## Methods

### `Private` applyJoins

▸ **applyJoins**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:34

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |

**Returns:** *void | Promise‹any›*

___

### `Private` buildPromise

▸ **buildPromise**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:66

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |
`options` | object |

**Returns:** *void | Promise‹any›*

___

###  join

▸ **join**(`lid`: string[], `instanceId`: string, ...`joins`: [ListenerJoins](../modules/_types_.md#listenerjoins)): *void*

Defined in join.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`...joins` | [ListenerJoins](../modules/_types_.md#listenerjoins) |

**Returns:** *void*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: ListenerEvent): *void*

Defined in join.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void*

___

### `Private` listenerBeforeLoadedAny

▸ **listenerBeforeLoadedAny**(`lid`: string[], `__namedParameters`: object): *void*

Defined in join.ts:107

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |

**Returns:** *void*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `event`: [ListenerJoinEvent](../interfaces/_types_.listenerjoinevent.md)): *void | Promise‹any›*

Defined in join.ts:174

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerJoinEvent](../interfaces/_types_.listenerjoinevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[], `event`: ListenerEvent): *void | Promise‹any›*

Defined in join.ts:181

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerReset

▸ **listenerReset**(`lid`: string[], `listener`: Listener): *void*

Defined in join.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |

**Returns:** *void*

___

### `Private` listenersJoined

▸ **listenersJoined**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:139

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |
`options` | object |

**Returns:** *void | Promise‹any›*

___

### `Private` parseId

▸ **parseId**(`id`: string, `listener`: Listener): *[string, string]*

Defined in join.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:196

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` waitForPromises

▸ **waitForPromises**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:204

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |

**Returns:** *void | Promise‹any›*
