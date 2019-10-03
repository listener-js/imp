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
* [listenerJoined](_join_.join.md#private-listenerjoined)
* [listenerJoins](_join_.join.md#private-listenerjoins)
* [listenersJoined](_join_.join.md#private-listenersjoined)
* [parseId](_join_.join.md#private-parseid)
* [promise](_join_.join.md#private-promise)
* [readJoins](_join_.join.md#private-readjoins)
* [waitForPromises](_join_.join.md#private-waitforpromises)

## Properties

###  joins

• **joins**: *Record‹string, [ListenerJoins](../modules/_types_.md#listenerjoins)›*

Defined in join.ts:9

___

###  promises

• **promises**: *Record‹string, Promise‹any››*

Defined in join.ts:10

___

### `Private` resolvers

• **resolvers**: *Record‹string, Function›*

Defined in join.ts:11

## Methods

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:13

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

Defined in join.ts:54

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

Defined in join.ts:90

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

▸ **listenerBindings**(`lid`: string[], `instanceId`: string, `instance`: any): *ListenerBindings*

Defined in join.ts:181

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *ListenerBindings*

___

### `Private` listenerJoined

▸ **listenerJoined**(`lid`: string[], `instanceId`: string, `instance`: any, `joinInstanceId`: string, `joinInstance`: any, `joinOptions?`: Record‹string, any›, `listenOptions?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`joinInstanceId` | string |
`joinInstance` | any |
`joinOptions?` | Record‹string, any› |
`listenOptions?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerJoins

▸ **listenerJoins**(`lid`: string[], `instanceId`: string, `instance`: any, `joinInstanceId`: string, `joinInstance`: any, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:120

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`joinInstanceId` | string |
`joinInstance` | any |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenersJoined

▸ **listenersJoined**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:131

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

Defined in join.ts:220

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`listener` | Listener |

**Returns:** *[string, string]*

___

### `Private` promise

▸ **promise**(`instanceId`: string): *Promise‹any›*

Defined in join.ts:228

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** *Promise‹any›*

___

### `Private` readJoins

▸ **readJoins**(`lid`: string[], `listener`: Listener, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in join.ts:236

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

Defined in join.ts:281

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`listener` | Listener |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*
