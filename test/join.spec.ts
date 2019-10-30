import join, { ListenerJoinEvent } from "../src"

import expect from "expect"

import {
  load,
  reset,
  ListenerEvent,
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

it("instance listener function", async (): Promise<any> => {
  expect.assertions(6)

  let test: Test = null,
    test2: Test2 = null

  class Test {
    join: typeof join.join

    fn(lid: string[]): void {
      expect(0).toBe(1)
    }

    listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2.fn")
    }
  }

  class Test2 {
    fn(lid: string[]): void {
      expect(lid).toEqual(["test2.fn", "test.fn", "hi"])
    }

    listenerJoined(
      lid,
      { instance, joinInstance }: ListenerJoinEvent
    ): void {
      expect(lid).toEqual([
        "test2.listenerJoined",
        "join.callListenerJoined",
        "test2",
        "listener.listenerAfterLoaded",
        "test",
        "listener.callListenerAfterLoaded",
        "test",
        "listener.load",
        "c",
      ])
      expect(instance.id).toBe("test2")
      expect(instance).toBe(test2)
      expect(joinInstance.id).toBe("test")
      expect(joinInstance).toBe(test)
    }
  }

  test = new Test()
  test2 = new Test2()

  load([], { test2 })
  // eslint-disable-next-line sort-keys
  load([], { test, join })

  test.fn(["hi"])
})

it("instance listener", (): void => {
  expect.assertions(3)

  class Test {
    join: typeof join.join

    private listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2")
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

it("multiple instance listeners", (): void => {
  expect.assertions(3)

  class Test {
    join: typeof join.join
    test2: Test2
    test3: Test3

    private listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2", "test3")
    }
  }

  class Test2 {}
  class Test3 {}

  const test = new Test()
  const test2 = new Test2()
  const test3 = new Test3()

  // eslint-disable-next-line sort-keys
  load([], { test, test2, test3, join })

  expect(test.test2).toBe(test2)
  expect(test.test3).toBe(test3)
})

it("async listener instance", async (): Promise<
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

it("async listener dependencies", (): Promise<any> => {
  expect.assertions(1)

  class Test {
    join: typeof join.join
    // eslint-disable-next-line
    test2: typeof test2
    // eslint-disable-next-line
    test3: typeof test3

    listenerLoaded(
      lid: string[],
      { instance }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2", "test3")
    }
  }

  const test = new Test()

  class Test2 {
    join: typeof join.join
    test: typeof test
    // eslint-disable-next-line
    test3: typeof test3

    listenerLoaded(
      lid: string[],
      { instance }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test", "test3")
    }
  }

  const test2 = new Test2()

  class Test3 {
    join: typeof join.join
    test: typeof test
    test2: typeof test2

    listenerLoaded(
      lid: string[],
      { instance }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test", "test2")
    }
  }

  const test3 = new Test3()

  const asyncTest = delay(1, test)
  const asyncTest2 = delay(1, test2)
  const asyncTest3 = delay(1, test3)

  return load([], {
    test: asyncTest,
    test2: asyncTest2,
    test3: asyncTest3,
    // eslint-disable-next-line sort-keys
    join,
  }).then(({ test, test2, test3 }): void => {
    expect(test.test2).toBe(test2)
    expect(test.test3).toBe(test3)

    expect(test2.test).toBe(test)
    expect(test2.test3).toBe(test3)

    expect(test3.test).toBe(test)
    expect(test3.test2).toBe(test2)
  })
})

it("async listener dependency across distinct loads", (): Promise<
  any
> => {
  expect.assertions(1)

  class Test {
    join: typeof join.join

    fn(lid: string[]): void {
      expect(0).toBe(1)
    }

    listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2.fn")
    }
  }

  const test2 = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test2.fn", "test.fn", "hi"])
    },
  }

  const test = new Test()
  const asyncTest = delay(1, test)

  const promise = load([], {
    test: asyncTest,
    // eslint-disable-next-line sort-keys
    join,
  }).then(({ test }): void => {
    test.fn(["hi"])
  })

  load([], { test2 })

  return promise
})

it("async join callback", async (): Promise<any> => {
  expect.assertions(4)

  let test: Test = null

  class Test {
    join: typeof join.join

    fn(lid: string[]): void {
      expect(0).toBe(1)
    }

    listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2.fn")
    }
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

  test = new Test()

  // eslint-disable-next-line sort-keys
  return load([], { test, test2, join })
})

it("async listener dependency with join callback", (): Promise<
  any
> => {
  let calls = 0

  class Test {
    join: typeof join.join

    listenerLoaded(
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void {
      this.join(lid, instance.id, "test2")
    }
  }

  const test2 = {
    listenerJoined(lid: string[]): void {
      calls += 1
    },
  }

  const test = new Test()
  const asyncTest = delay(1, test)

  return load([], {
    test: asyncTest,
    test2,
    // eslint-disable-next-line sort-keys
    join,
  }).then(() => {
    expect(calls).toBe(1)
  })
})
