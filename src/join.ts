import {
  Listener,
  ListenerEvent,
} from "@listener-js/listener"

import { ListenerJoins, ListenerJoinEvent } from "./types"

export class Join {
  public id: string
  public joins: Record<string, ListenerJoins> = {}
  public promises: Record<string, Promise<any>> = {}

  private resolvers: Record<string, Function> = {}

  public join(
    lid: string[],
    instanceId: string,
    ...joins: ListenerJoins
  ): void {
    const j = this.joins[instanceId]
    this.joins[instanceId] = j ? j.concat(joins) : joins
  }

  private applyJoins(
    lid: string[],
    { listener, instance }: ListenerEvent
  ): void | Promise<any> {
    if (!this.joins[instance.id]) {
      return
    }

    for (const [joinIds] of this.joins[instance.id]) {
      for (const joinId of joinIds) {
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
              [`${instance.id}.${fnId}`, ...id],
              ...args
            )
          }
        } else {
          instance[joinId] = listener.instances[joinId]
        }
      }
    }
  }

  private buildPromise(
    lid: string[],
    { listener, instance, options }: ListenerEvent
  ): void | Promise<any> {
    const id = lid[2]
    if (instance.then) {
      this.promise(id)
      instance
        .then((instance):
          | Record<string, any>
          | Promise<Record<string, any>> => {
          this.promises[id] = undefined

          return listener.load(
            lid,
            { [id]: instance },
            { ...options, reload: undefined }
          )
        })
        .then(() => {
          this.resolvers[id]()
        })
    }
  }

  private listenerBeforeLoaded(
    lid: string[],
    event: ListenerEvent
  ): void {
    const { existing, listener } = event

    for (const instanceId of existing) {
      this.listenerBeforeLoadedAny(lid, {
        ...event,
        instance: listener.instances[instanceId],
      })
    }
  }

  private listenerBeforeLoadedAny(
    lid: string[],
    { instance, listener }: ListenerEvent
  ): void {
    instance.join = this.join.bind(this)

    listener.bind(
      lid,
      [`${listener.id}.listenerLoaded`, "**"],
      [`${this.id}.buildPromise`, { append: 100 }],
      [`${this.id}.waitForPromises`, { append: 100.1 }],
      [`${this.id}.applyJoins`, { append: 100.2 }],
      [`${this.id}.listenersJoined`, { append: 100.3 }]
    )

    if (instance !== this && instance.listenerJoined) {
      listener.bind(
        lid,
        [`${this.id}.listenerJoined`, instance.id, "**"],
        `${instance.id}.listenerJoined`
      )
    }
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

  private listenersJoined(
    lid: string[],
    { listener, instance, options }: ListenerEvent
  ): void | Promise<any> {
    let promises = []

    if (!this.joins[instance.id]) {
      return
    }

    for (const [joinIds, joinOptions] of this.joins[
      instance.id
    ]) {
      for (const joinId of joinIds) {
        const [id] = this.parseId(joinId, listener)

        const { promises: p } = listener.captureOutputs(
          lid,
          { [id]: listener.instances[id] },
          {
            joinInstance: instance,
            options: { ...options, joinOptions },
          },
          this.listenerJoined
        )

        promises = promises.concat(p)
      }
    }

    if (promises.length) {
      return Promise.all(promises)
    }
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

  private waitForPromises(
    lid: string[],
    { listener, instance }: ListenerEvent
  ): void | Promise<any> {
    const promises = []

    if (this.promises[instance.id]) {
      promises.push(this.promises[instance.id])
    }

    if (this.joins[instance.id]) {
      for (const [joinIds] of this.joins[instance.id]) {
        for (const joinId of joinIds) {
          const [id] = this.parseId(joinId, listener)

          if (this.promises[id]) {
            promises.push(this.promises[id])
          }
        }
      }
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }
}

export default new Join()
export * from "./types"
