import { imp } from "../"
import { listener, reset } from "@listener-js/listener"
import { log } from "@listener-js/log"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

beforeEach((): void => {
  reset()
  listener({ imp, log })
})

test("instance listener function", async (): Promise<
  any
> => {
  expect.assertions(4)

  const test = {
    externals: ["test2.fn"],
    fn: undefined,
  }

  const test2 = {
    fn: (id: string[]): void => {
      expect(id).toEqual(["test2.fn", "test.fn", "hi"])
    },
    listenerJoin: (id, instanceId, instance): void => {
      expect(id).toEqual([
        "test2.listenerJoin",
        "imp.externalLoad",
        "listener.listenerLoad",
        "test",
      ])
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    },
    listeners: ["fn"],
  }

  listener({ test, test2 })

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
    public listeners = ["fn"]

    public fn(id: string[]): void {
      expect(id).toEqual(["test2.fn", "hi"])
    }

    public listenerJoin(id, instanceId, instance): void {
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    }
  }

  const test2 = new Test2()

  listener({ test, test2 })

  test.test2.fn(["hi"])
})

test("async listener instance", (): Promise<any> => {
  expect.assertions(1)

  const test = {
    fn: (id: string[]): void => {
      expect(id).toEqual(["test.fn", "hi"])
    },
    listeners: ["fn"],
  }

  const promise = delay(1, test)

  return listener({ test: promise }).then((): void => {
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
    fn: (id: string[]): void => {
      expect(id).toEqual(["test2.fn", "test.fn", "hi"])
    },
    listeners: ["fn"],
  }

  const asyncTest = delay(1, test)

  const promise = listener({ test: asyncTest }).then(
    (): void => {
      test.fn(["hi"])
    }
  )

  listener({ test2 })

  return promise
})

test("async listenerLoad callback", async (): Promise<
  any
> => {
  expect.assertions(1)

  const test = {
    listenerLoad: async (id: string[]): Promise<any> => {
      return delay(1).then((): void => {
        expect(id).toEqual([
          "test.listenerLoad",
          "listener.listenerLoad",
          "test",
        ])
      })
    },
  }

  return listener({ test })
})

test("async join callback", (): void => {
  expect.assertions(2)

  const test = {
    externals: ["test2.fn"],
    fn: undefined,
  }

  const test2 = {
    fn: (): void => {},
    listenerJoin: async (
      id: string,
      instanceId: string,
      instance: any
    ): Promise<any> => {
      return delay(1).then((): void => {
        expect(instanceId).toEqual("test")
        expect(instance).toEqual(test)
      })
    },
    listeners: ["fn"],
  }

  return listener({ test, test2 })
})
