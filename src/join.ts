import {
  Listener,
  ListenerBind,
} from "@listener-js/listener"

export class Join {
  private joins: Record<string, string[][]> = {}
  private promises: Record<string, Promise<any>> = {}
  private resolvers: Record<string, Function> = {}

  private applyCallbacksBindings(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (instance === this) {
        continue
      }

      if (instance.listenerJoin) {
        listener.bind(
          lid,
          ["join.listenerJoin", instanceId, "**"],
          `${instanceId}.listenerJoin`,
          { append: true, return: true }
        )
      }

      if (instance.listenerJoined) {
        listener.bind(
          lid,
          ["join.listenerJoined", instanceId, "**"],
          `${instanceId}.listenerJoined`
        )
      }
    }
  }

  private anyListenerLoaded(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any> | void {
    if (!this.joins[instanceId]) {
      return
    }

    for (const [joinId] of this.joins[instanceId]) {
      const [joinInstanceId, fnId] = this.parseId(
        joinId,
        listener
      )

      if (fnId) {
        instance[fnId] = (
          id: string[],
          ...args: any[]
        ): any => {
          return listener.instances[joinInstanceId][fnId](
            [`${instanceId}.${fnId}`, ...id],
            ...args
          )
        }
      } else {
        instance[joinId] = listener.instances[joinId]
      }
    }
  }

  private buildPromise(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any> | void {
    if (instance.then) {
      this.promise(instanceId)
      instance
        .then((instance):
          | Record<string, any>
          | Promise<Record<string, any>> => {
          this.promises[instanceId] = undefined

          return listener.load(
            lid,
            { [instanceId]: instance },
            options
          )
        })
        .then(() => {
          this.resolvers[instanceId]()
        })
    }
  }

  private listenerJoin(
    lid: string[],
    instanceId: string,
    instance: any,
    joinInstanceId: string,
    joinInstance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private listenersJoined(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (!this.joins[instanceId]) {
      return
    }

    let promises = []

    for (const [joinId] of this.joins[instanceId]) {
      const [id] = this.parseId(joinId, listener)

      const { promises: p } = listener.captureOutputs(
        lid,
        [instanceId, instance, listener, options],
        { [id]: listener.instances[id] },
        this.listenerJoined
      )

      promises = promises.concat(p)
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private listenerJoined(
    lid: string[],
    instanceId: string,
    instance: any,
    joinInstanceId: string,
    joinInstance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private listenerBindings(
    lid: string[],
    instanceId: string,
    instance: any
  ): ListenerBind {
    return [
      [
        ["listener.listenersLoaded", "**"],
        `${instanceId}.applyCallbacksBindings`,
        { listener: true, prepend: true },
      ],
      [
        [`${instanceId}.anyListenerLoaded`, "**"],
        `${instanceId}.buildPromise`,
        { prepend: 0.3 },
      ],
      [
        [`${instanceId}.anyListenerLoaded`, "**"],
        `${instanceId}.readJoins`,
        { prepend: 0.2 },
      ],
      [
        [`${instanceId}.anyListenerLoaded`, "**"],
        `${instanceId}.waitForPromises`,
        { prepend: 0.1 },
      ],
      [
        [`${instanceId}.anyListenerLoaded`, "**"],
        `${instanceId}.listenersJoined`,
        { append: 0.1 },
      ],
    ]
  }

  private parseId(
    id: string,
    listener: Listener
  ): [string, string] {
    const [instanceId, fnId] = listener.parseId(id)
    return [instanceId || id, fnId]
  }

  private promise(instanceId: string): Promise<any> {
    return (this.promises[instanceId] =
      this.promises[instanceId] ||
      new Promise((resolve): void => {
        this.resolvers[instanceId] = resolve
      }))
  }

  private readJoins(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any> | void {
    const promises = []

    const {
      promisesById,
      valuesById,
    } = listener.captureOutputs(
      lid,
      [listener, options],
      { [instanceId]: instance },
      this.listenerJoin
    )

    this.joins = {
      ...this.joins,
      ...valuesById,
    }

    for (const id in promisesById) {
      const promise = promisesById[id]

      promises.push(
        promise.then((join: string[][]): void => {
          this.joins = {
            ...this.joins,
            [id]: join,
          }
        })
      )
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private waitForPromises(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any> | void {
    const promises = this.promises[instanceId]
      ? [this.promises[instanceId]]
      : []

    if (this.joins[instanceId]) {
      for (const [joinId] of this.joins[instanceId]) {
        const [id] = this.parseId(joinId, listener)

        if (this.promises[id]) {
          promises.push(this.promises[id])
        }
      }
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }
}

export default new Join()
