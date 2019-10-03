import join, { ListenerJoins, ListenerJoinEvent } from "../"

import {
  load,
  reset,
  Listener,
} from "@listener-js/listener"

import log from "@listener-js/log"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

beforeEach((): void => {
  reset(["beforeEach"])
  load(["beforeEach"], { log })
})

test("instance listener function", async (): Promise<
  any
> => {
  expect.assertions(6)

  const test = {
    fn: (id: string[]): void => {},
    listenerJoins: (lid): ListenerJoins => {
      return [[["test2.fn"]]]
    },
  }

  const test2 = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test2.fn", "test.fn", "hi"])
    },
    listenerJoined: (
      lid,
      { instance, joinInstance }: ListenerJoinEvent
    ): void => {
      expect(lid).toEqual([
        "test2.listenerJoined",
        "join.listenerJoined",
        "test2",
        "join.listenersJoined",
        "listener.load",
        "listener.load",
      ])
      expect(instance.id).toBe("test2")
      expect(instance).toBe(test2)
      expect(joinInstance.id).toBe("test")
      expect(joinInstance).toBe(test)
    },
  }

  // eslint-disable-next-line sort-keys
  load([], { test, test2, join })

  test.fn(["hi"])
})

test("instance listener", (): void => {
  expect.assertions(3)

  class Test {
    private listenerJoins(lid): ListenerJoins {
      return [[["test2"]]]
    }
    public test2: Test2
  }

  const test = new Test()

  class Test2 {
    public fn(lid: string[]): void {
      expect(lid).toEqual(["test2.fn", "hi"])
    }

    private listenerJoined(
      lid,
      { instance, joinInstance }: ListenerJoinEvent
    ): void {
      expect(instance.id).toBe("test2")
      expect(joinInstance.id).toBe("test")
    }
  }

  const test2 = new Test2()

  // eslint-disable-next-line sort-keys
  load([], { test, test2, join })

  test.test2.fn(["hi"])
})

test("async listener instance", async (): Promise<
  Record<string, any>
> => {
  expect.assertions(1)

  const test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test.fn", "hi"])
    },
  }

  const promise = delay(1, test)

  // eslint-disable-next-line sort-keys
  return load([], { test: promise, join }).then(
    (): void => {
      test.fn(["hi"])
    }
  )
})

test("async listener wait for dependency", (): Promise<
  any
> => {
  expect.assertions(1)

  const test = {
    fn: undefined,
    listenerJoins: (lid): ListenerJoins => [[["test2.fn"]]],
  }

  const test2 = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test2.fn", "test.fn", "hi"])
    },
  }

  const asyncTest = delay(1, test)

  const promise = load([], {
    test: asyncTest,
    // eslint-disable-next-line sort-keys
    join,
  }).then((): void => {
    test.fn(["hi"])
  })

  load([], { test2 })

  return promise
})

test("async join callback", async (): Promise<any> => {
  expect.assertions(4)

  const test = {
    fn: undefined,
    listenerJoins: (lid): ListenerJoins => [[["test2.fn"]]],
  }

  const test2 = {
    fn: (): void => {},
    listenerJoined: async (
      lid: string,
      { instance, joinInstance }: ListenerJoinEvent
    ): Promise<any> => {
      return delay(1).then((): void => {
        expect(instance.id).toBe("test2")
        expect(instance).toEqual(test2)
        expect(joinInstance.id).toBe("test")
        expect(joinInstance).toEqual(test)
      })
    },
  }

  // eslint-disable-next-line sort-keys
  return load([], { test, test2, join })
})
