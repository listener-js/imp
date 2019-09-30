import {
  Listener,
  ListenerBind,
} from "@listener-js/listener"

export class Join {
  private joins: Record<string, string[][]> = {}
  private promises: Record<string, Promise<any>> = {}
  private resolvers: Record<string, Function> = {}

  private anyInstanceLoaded(
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

  private instancesJoined(
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
        [instanceId, instance, this, options],
        { [id]: listener.instances[id] },
        this.instanceJoined
      )

      promises = promises.concat(p)
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private instanceJoined(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private listenerBind(
    lid: string[],
    instanceId: string
  ): ListenerBind {
    return [
      [
        ["listener.instanceLoaded", "**"],
        `${instanceId}.anyInstanceLoaded`,
        { prepend: true },
      ],
      [
        [`${instanceId}.anyInstanceLoaded`, "**"],
        `${instanceId}.buildPromise`,
        { prepend: 0.3 },
      ],
      [
        [`${instanceId}.anyInstanceLoaded`, "**"],
        `${instanceId}.readJoins`,
        { prepend: 0.2 },
      ],
      [
        [`${instanceId}.anyInstanceLoaded`, "**"],
        `${instanceId}.waitForPromises`,
        { prepend: 0.1 },
      ],
      [
        [`${instanceId}.anyInstanceLoaded`, "**"],
        `${instanceId}.instancesJoined`,
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
      [this, options],
      { [instanceId]: instance },
      "listenerJoin"
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
