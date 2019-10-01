[@listener-js/join](../README.md) › [Globals](../globals.md) › ["join"](../modules/_join_.md) › [Join](_join_.join.md)

# Class: Join

## Hierarchy

* **Join**

## Index

### Properties

* [joins](_join_.join.md#joins)
* [promises](_join_.join.md#promises)
* [resolvers](_join_.join.md#private-resolvers)

### Methods

* [applyCallbacksBindings](_join_.join.md#private-applycallbacksbindings)
* [applyJoins](_join_.join.md#private-applyjoins)
* [buildPromise](_join_.join.md#private-buildpromise)
* [listenerBindings](_join_.join.md#private-listenerbindings)
* [listenerJoin](_join_.join.md#private-listenerjoin)
* [listenerJoined](_join_.join.md#private-listenerjoined)
* [listenersJoined](_join_.join.md#private-listenersjoined)
* [parseId](_join_.join.md#private-parseid)
* [promise](_join_.join.md#private-promise)
* [readJoins](_join_.join.md#private-readjoins)
* [waitForPromises](_join_.join.md#private-waitforpromises)

## Properties

###  joins

• **joins**: *Record‹string, string[][]›*

Defined in join.ts:7

___

###  promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:8

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:9

## Methods

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:11

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

Defined in join.ts:51

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

Defined in join.ts:86

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

▸ **listenerBindings**(`lid`: string[], `instanceId`: string, `instance`: any): *ListenerBind*

Defined in join.ts:174

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *ListenerBind*

___

### `Private` listenerJoin

▸ **listenerJoin**(`lid`: string[], `instanceId`: string, `instance`: any, `joinInstanceId`: string, `joinInstance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:116

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`joinInstanceId` | string |
`joinInstance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `joinInstanceId`: string, `joinInstance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:162

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`joinInstanceId` | string |
`joinInstance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

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

Defined in join.ts:213

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:221

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` readJoins

▸ **readJoins**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:229

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

Defined in join.ts:274

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*
