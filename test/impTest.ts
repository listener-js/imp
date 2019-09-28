import { imp } from "../"
import { load, reset } from "@listener-js/listener"
import { log } from "@listener-js/log"

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
  expect.assertions(4)

  const test = {
    externals: ["test2.fn"],
    fn: (id: string[]): void => {},
  }

  const test2 = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test2.fn", "test.fn", "hi"])
    },
    listenerJoin: (lid, instanceId, instance): void => {
      expect(lid).toEqual([
        "test2.listenerJoin",
        "imp.externalCallbacks",
        "imp.anyInstanceLoaded",
        "listener.instanceLoaded",
        "test",
        "listener.instancesLoaded",
        "listener.load",
      ])
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    },
  }

  // eslint-disable-next-line sort-keys
  load([], { test, test2, imp })

  test.fn(["hi"])
})

test("instance listener", (): void => {
  expect.assertions(3)

  class Test {
    public externals = ["test2"]
    public test2: Test2
  }

  const test = new Test()

  class Test2 {
    public fn(lid: string[]): void {
      expect(lid).toEqual(["test2.fn", "hi"])
    }

    public listenerJoin(lid, instanceId, instance): void {
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    }
  }

  const test2 = new Test2()

  // eslint-disable-next-line sort-keys
  load([], { test, test2, imp })

  test.test2.fn(["hi"])
})

test("async listener instance", (): Promise<any> => {
  expect.assertions(1)

  const test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["test.fn", "hi"])
    },
  }

  const promise = delay(1, test)

  // eslint-disable-next-line sort-keys
  return load([], { test: promise, imp }).then((): void => {
    test.fn(["hi"])
  })
})

test("async listener wait for dependency", (): Promise<
  any
> => {
  expect.assertions(1)

  const test = {
    externals: ["test2.fn"],
    fn: undefined,
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
    imp,
  }).then((): void => {
    test.fn(["hi"])
  })

  load([], { test2 })

  return promise
})

test("async join callback", async (): Promise<any> => {
  expect.assertions(2)

  const test = {
    externals: ["test2.fn"],
    fn: undefined,
  }

  const test2 = {
    fn: (): void => {},
    listenerJoin: async (
      lid: string,
      instanceId: string,
      instance: any
    ): Promise<any> => {
      return delay(1).then((): void => {
        expect(instanceId).toEqual("test")
        expect(instance).toEqual(test)
      })
    },
  }

  // eslint-disable-next-line sort-keys
  return load([], { test, test2, imp })
})
