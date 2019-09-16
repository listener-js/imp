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
  listener({ log })
  listener({ imp })
})

test.only("instance listener function", async (): Promise<
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
    joinedListener: (id, instanceId, instance): void => {
      expect(id).toEqual([
        "imp.loadExternal",
        "listener.listenerLoad",
        "test",
      ])
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    },
    listeners: ["fn", "join"],
  }

  return listener({ test, test2 }).then(() => {
    test.fn(["hi"])
  })
})

test("instance listener", (): void => {
  expect.assertions(3)

  class Test {
    public instances = ["test2"]
    public test2: Test2
  }

  const test = new Test()

  class Test2 {
    public listeners = ["fn", "join"]

    public fn(id: string[]): void {
      expect(id).toEqual(["test2.fn", "hi"])
    }

    public join(id, instanceId, instance): void {
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
    fn: undefined,
    instances: ["test2.fn"],
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

test("async listen callback", (): Promise<any> => {
  expect.assertions(1)

  const test = {
    listen: async (): Promise<any> => {
      return delay(1).then((): void => {
        expect(1).toBe(1)
      })
    },
    listeners: ["listen"],
  }

  return listener({ test })
})

test("async join callback", (): void => {
  expect.assertions(2)

  const test = {
    fn: undefined,
    instances: ["test2.fn"],
  }

  const test2 = {
    fn: (): void => {},
    joinedListener: async (
      id: string,
      instanceId: string,
      instance: any
    ): Promise<any> => {
      return delay(1).then((): void => {
        expect(instanceId).toEqual("test")
        expect(instance).toEqual(test)
      })
    },
    listeners: ["fn", "join"],
  }

  return listener({ test, test2 })
})
