[@listener-js/join](../README.md) › [Globals](../globals.md) › ["join"](../modules/_join_.md) › [Join](_join_.join.md)

# Class: Join

## Hierarchy

* **Join**

## Index

### Properties

* [id](_join_.join.md#id)
* [joins](_join_.join.md#joins)
* [options](_join_.join.md#options)
* [promises](_join_.join.md#promises)
* [resolvers](_join_.join.md#private-resolvers)

### Methods

* [applyJoins](_join_.join.md#private-applyjoins)
* [bindListenerJoined](_join_.join.md#private-bindlistenerjoined)
* [buildPromise](_join_.join.md#private-buildpromise)
* [callListenerJoined](_join_.join.md#private-calllistenerjoined)
* [eachJoin](_join_.join.md#private-eachjoin)
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

• **joins**: *Record‹string, string[]›*

Defined in join.ts:20

___

###  options

• **options**: *Record‹string, [ListenerJoinOptions](../modules/_types_.md#listenerjoinoptions)[]›*

Defined in join.ts:21

___

###  promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:22

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:24

## Methods

### `Private` applyJoins

▸ **applyJoins**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:58

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | object |
`listener` | Listener |

**Returns:** *void | Promise‹any›*

___

### `Private` bindListenerJoined

▸ **bindListenerJoined**(`lid`: string[], `__namedParameters`: object): *void*

Defined in join.ts:83

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | object |
`listener` | Listener |

**Returns:** *void*

___

### `Private` buildPromise

▸ **buildPromise**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:102

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

### `Private` callListenerJoined

▸ **callListenerJoined**(`lid`: string[], `event`: ListenerEvent): *void | Promise‹void›*

Defined in join.ts:127

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void | Promise‹void›*

___

### `Private` eachJoin

▸ **eachJoin**(`id`: string, `listener`: Listener, `fn`: function): *void*

Defined in join.ts:143

**Parameters:**

▪ **id**: *string*

▪ **listener**: *Listener*

▪ **fn**: *function*

▸ (`info`: [JoinInfo](../interfaces/_join_.joininfo.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`info` | [JoinInfo](../interfaces/_join_.joininfo.md) |

**Returns:** *void*

___

###  join

▸ **join**(`lid`: string[], `instanceId`: string, ...`joins`: [ListenerJoins](../modules/_types_.md#listenerjoins)): *void*

Defined in join.ts:26

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

Defined in join.ts:165

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void*

___

### `Private` listenerBeforeLoadedAny

▸ **listenerBeforeLoadedAny**(`lid`: string[], `__namedParameters`: object): *void*

Defined in join.ts:192

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

Defined in join.ts:210

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerJoinEvent](../interfaces/_types_.listenerjoinevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[], `event`: ListenerEvent): *void | Promise‹any›*

Defined in join.ts:217

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerReset

▸ **listenerReset**(`lid`: string[], `listener`: Listener): *void*

Defined in join.ts:224

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |

**Returns:** *void*

___

### `Private` listenersJoined

▸ **listenersJoined**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:203

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

Defined in join.ts:234

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:242

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` waitForPromises

▸ **waitForPromises**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in join.ts:250

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | object |
`listener` | Listener |

**Returns:** *void | Promise‹any›*
