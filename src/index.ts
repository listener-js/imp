import instance, {
  Listener,
  ListenerEvent,
} from "@listener-js/listener"

export interface ListenerJoinEvent extends ListenerEvent {
  joinInstance: any
}

type ListenerJoinOptions = {}

type ListenerJoins =
  | string[]
  | (string | ListenerJoinOptions)[][]

interface JoinInfo {
  joinInstance: any
  joinInstanceId: string
  joinFnId: string
}

export class Join {
  public id: string
  public joins: Record<string, string[]> = {}
  public options: Record<string, ListenerJoinOptions[]> = {}
  public promises: Record<string, Promise<any>> = {}

  private resolvers: Record<string, Function> = {}

  public join(
    lid: string[],
    instanceId: string,
    ...joins: ListenerJoins
  ): void {
    for (let join of joins) {
      const j = this.joins[instanceId]
      const o = this.options[instanceId]

      let joinId: string
      let options: ListenerJoinOptions

      if (typeof join === "string") {
        joinId = join
      } else {
        const last = join[join.length - 1]
        const hasOption = typeof last !== "string"
        if (hasOption) {
          options = last as ListenerJoinOptions
          join = join.slice(0, -1)
        }
        ;[joinId] = join as string[]
      }

      this.joins[instanceId] = j ? [...j, joinId] : [joinId]

      this.options[instanceId] = o
        ? [...o, options]
        : [options]
    }
  }

  private applyJoins(
    lid: string[],
    { listener, instance: { id } }: ListenerEvent
  ): void | Promise<any> {
    this.eachJoin(
      id,
      listener,
      ({ joinFnId, joinInstanceId }) => {
        if (joinFnId) {
          listener.instances[id][joinFnId] = (
            _lid: string[],
            ...args: any[]
          ): any => {
            return listener.instances[joinInstanceId][
              joinFnId
            ]([`${id}.${joinFnId}`, ..._lid], ...args)
          }
        } else {
          listener.instances[id][joinInstanceId] =
            listener.instances[joinInstanceId]
        }
      }
    )
  }

  private bindListenerJoined(
    lid: string[],
    { instance: { id }, listener }: ListenerEvent
  ): void {
    this.eachJoin(id, listener, ({ joinInstance }) => {
      if (joinInstance && joinInstance.listenerJoined) {
        listener.bind(
          lid,
          [`${listener.id}.listenerAfterLoaded`, id, "**"],
          [
            `${this.id}.callListenerJoined`,
            joinInstance.id,
            { once: true },
          ]
        )
      }
    })
  }

  private buildJoinPromises(
    lid: string[],
    { listener, instance, options }: ListenerEvent
  ): void | Promise<any> {
    const id = lid[2]
    this.eachJoin(id, listener, ({ joinInstanceId }) => {
      if (!listener.instances[joinInstanceId]) {
        this.promise(joinInstanceId)
      }
    })
  }

  private callListenerJoined(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<void> {
    const id = lid[1]
    const instance = event.listener.instances[id]
    const joinInstance = event.instance

    const joinEvent: ListenerJoinEvent = {
      ...event,
      ...{ instance, joinInstance },
    }

    return instance.listenerJoined(lid, joinEvent)
  }

  private eachJoin(
    id: string,
    listener: Listener,
    fn: (info: JoinInfo) => void
  ): void {
    if (!this.joins[id]) {
      return
    }

    for (const joinId of this.joins[id]) {
      const [joinInstanceId, joinFnId] = this.parseId(
        joinId,
        listener
      )

      const joinInstance =
        listener.instances[joinInstanceId]

      fn({ joinFnId, joinInstance, joinInstanceId })
    }
  }

  private listenerBeforeLoaded(
    lid: string[],
    event: ListenerEvent
  ): void {
    const { existing, instance, listener } = event

    for (const instanceId of existing) {
      this.listenerBeforeLoadedAny(lid, {
        ...event,
        instance: listener.instances[instanceId],
      })
    }

    listener.bind(
      lid,
      [`${listener.id}.listenerLoaded`, "**"],
      [`${this.id}.buildJoinPromises`, { append: 100 }],
      [`${this.id}.resolvePromise`, { append: 100.1 }],
      [`${this.id}.waitForJoinPromises`, { append: 100.2 }],
      [`${this.id}.applyJoins`, { append: 100.3 }],
      [`${this.id}.bindListenerJoined`, { append: 100.4 }]
    )
  }

  private listenerBeforeLoadedAny(
    lid: string[],
    { instance, listener }: ListenerEvent
  ): void {
    instance.join = this.join.bind(this)
  }

  private listenersJoined(
    lid: string[],
    { listener, instance, options }: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenerJoined(
    lid: string[],
    event: ListenerJoinEvent
  ): void | Promise<any> {
    return
  }

  private listenerJoins(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenerReset(
    lid: string[],
    listener: Listener
  ): void {
    delete listener["join"]
    this.joins = {}
    this.promises = {}
    this.resolvers = {}
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

  private resolvePromise(
    lid: string[],
    { instance }: ListenerEvent
  ): void | Promise<any> {
    if (this.resolvers[instance.id]) {
      this.resolvers[instance.id]()
    }
  }

  private waitForJoinPromises(
    lid: string[],
    { listener, instance: { id } }: ListenerEvent
  ): void | Promise<any> {
    const promises = []

    this.eachJoin(id, listener, ({ joinInstanceId }) => {
      if (this.promises[joinInstanceId]) {
        promises.push(this.promises[joinInstanceId])
      }
    })

    if (promises.length) {
      return Promise.all(promises)
    }
  }
}

export default new Join()
