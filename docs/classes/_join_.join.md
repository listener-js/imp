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

* [applyCallbacksBindings](_join_.join.md#private-applycallbacksbindings)
* [applyJoins](_join_.join.md#private-applyjoins)
* [buildPromise](_join_.join.md#private-buildpromise)
* [listenerBindings](_join_.join.md#private-listenerbindings)
* [listenerJoined](_join_.join.md#private-listenerjoined)
* [listenerJoins](_join_.join.md#private-listenerjoins)
* [listenersJoined](_join_.join.md#private-listenersjoined)
* [parseId](_join_.join.md#private-parseid)
* [promise](_join_.join.md#private-promise)
* [readJoins](_join_.join.md#private-readjoins)
* [waitForPromises](_join_.join.md#private-waitforpromises)

## Properties

###  id

• **id**: *string*

Defined in join.ts:10

___

###  joins

• **joins**: *Record‹string, [ListenerJoins](../modules/_types_.md#listenerjoins)›*

Defined in join.ts:11

___

###  promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:12

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:13

## Methods

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyJoins

▸ **applyJoins**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` buildPromise

▸ **buildPromise**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `__namedParameters`: object): *ListenerBindings*

Defined in join.ts:176

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |
`listener` | Listener |

**Returns:** *ListenerBindings*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `event`: [ListenerJoinEvent](../interfaces/_types_.listenerjoinevent.md)): *void | Promise‹any›*

Defined in join.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerJoinEvent](../interfaces/_types_.listenerjoinevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[], `event`: ListenerEvent): *void | Promise‹any›*

Defined in join.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | ListenerEvent |

**Returns:** *void | Promise‹any›*

___

### `Private` listenersJoined

▸ **listenersJoined**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:128

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` parseId

▸ **parseId**(`id`: string, `listener`: Listener): *[string, string]*

Defined in join.ts:214

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:222

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` readJoins

▸ **readJoins**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:230

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` waitForPromises

▸ **waitForPromises**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:275

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*
