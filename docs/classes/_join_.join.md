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

* [anyListenerLoaded](_join_.join.md#private-anylistenerloaded)
* [applyCallbacksBindings](_join_.join.md#private-applycallbacksbindings)
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

### `Private` anyListenerLoaded

▸ **anyListenerLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:43

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

### `Private` buildPromise

▸ **buildPromise**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:76

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

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `instanceId`: string, `instance`: any): *ListenerBind*

Defined in join.ts:158

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

Defined in join.ts:103

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

Defined in join.ts:146

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

▸ **listenersJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:115

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

### `Private` parseId

▸ **parseId**(`id`: string, `listener`: Listener): *[string, string]*

Defined in join.ts:192

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:200

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` readJoins

▸ **readJoins**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: Listener, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in join.ts:208

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

Defined in join.ts:250

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | Listener |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*
