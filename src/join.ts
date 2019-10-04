import {
  Listener,
  ListenerBindings,
  ListenerEvent,
} from "@listener-js/listener"

import { ListenerJoins, ListenerJoinEvent } from "./types"

export class Join {
  public id: string
  public joins: Record<string, ListenerJoins> = {}
  public promises: Record<string, Promise<any>> = {}
  private resolvers: Record<string, Function> = {}

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

  private listenerBindings(
    lid: string[],
    { instance, listener }: ListenerEvent
  ): ListenerBindings {
    return [
      [
        [`${listener.id}.listenerLoaded`, "**"],
        `${instance.id}.buildPromise`,
        { append: 0.1 },
      ],
      [
        [`${listener.id}.listenerLoaded`, "**"],
        `${instance.id}.readJoins`,
        { append: 0.2 },
      ],
      [
        [`${listener.id}.listenerLoaded`, "**"],
        `${instance.id}.waitForPromises`,
        { append: 0.3 },
      ],
      [
        [`${listener.id}.listenerLoaded`, "**"],
        `${instance.id}.applyJoins`,
        { append: 0.4 },
      ],
      [
        [`${listener.id}.listenerLoaded`, "**"],
        `${instance.id}.listenersJoined`,
        { append: 0.5 },
      ],
    ]
  }

  private listenerExtendBindings(
    lid: string[],
    value: ListenerBindings = [],
    { instance }: ListenerEvent
  ): ListenerBindings {
    if (instance === this) {
      return value
    }

    const bindings: ListenerBindings = value.slice(0)

    if (instance.listenerJoins) {
      bindings.push([
        [`${this.id}.listenerJoins`, instance.id, "**"],
        `${instance.id}.listenerJoins`,
        { append: true, return: true },
      ])
    }

    if (instance.listenerJoined) {
      bindings.push([
        [`${this.id}.listenerJoined`, instance.id, "**"],
        `${instance.id}.listenerJoined`,
      ])
    }

    return bindings
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

  private readJoins(
    lid: string[],
    { listener, instance, options }: ListenerEvent
  ): void | Promise<any> {
    const promises = []

    const {
      promisesById,
      valuesById,
    } = listener.captureOutputs(
      lid,
      { [instance.id]: instance },
      { options },
      this.listenerJoins
    )

    this.joins = {
      ...this.joins,
      ...valuesById,
    }

    for (const id in promisesById) {
      const promise = promisesById[id]

      promises.push(
        promise.then((join: ListenerJoins): void => {
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
