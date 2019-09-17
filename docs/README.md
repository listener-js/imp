[@listener-js/imp](README.md) › [Globals](globals.md)

# @listener-js/imp


# imp

![imp](media/imp.gif)

## Install

```bash
npm install @listener-js/imp @listener-js/listener
```

## Usage

```js
import { imp } from "@listener-js/imp"
import { listener } from "@listener-js/listener"

listener({
  imp,
  dynamicListener: import("./dynamicListener"),
})
```