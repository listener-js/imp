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

  private applyCallbacksBindings(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (
      options &&
      options.reload === true &&
      Object.values(instances).indexOf(this) < 0
    ) {
      return
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (instance === this) {
        continue
      }

      if (instance.listenerJoins) {
        listener.bind(
          lid,
          ["join.listenerJoins", instanceId, "**"],
          `${instanceId}.listenerJoins`,
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

  private applyJoins(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>
  ): void | Promise<any> {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (!this.joins[instanceId]) {
        continue
      }

      for (const [joinIds] of this.joins[instanceId]) {
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
              return listener.instances[joinInstanceId][
                fnId
              ]([`${instance.id}.${fnId}`, ...id], ...args)
            }
          } else {
            instance[joinId] = listener.instances[joinId]
          }
        }
      }
    }
  }

  private buildPromise(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

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
              { ...options, reload: undefined }
            )
          })
          .then(() => {
            this.resolvers[instanceId]()
          })
      }
    }
  }

  private listenerJoins(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenersJoined(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    let promises = []

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (!this.joins[instanceId]) {
        continue
      }

      for (const [joinIds, joinOptions] of this.joins[
        instanceId
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

  private listenerBindings(
    lid: string[],
    { instance, listener }: ListenerEvent
  ): ListenerBindings {
    return [
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.applyCallbacksBindings`,
        { listener: true, prepend: true },
      ],
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.buildPromise`,
        { append: 0.1, listener: true },
      ],
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.readJoins`,
        { append: 0.2, listener: true },
      ],
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.waitForPromises`,
        { append: 0.3, listener: true },
      ],
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.applyJoins`,
        { append: 0.4, listener: true },
      ],
      [
        [`${listener.id}.load`, "**"],
        `${instance.id}.listenersJoined`,
        { append: 0.5, listener: true },
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
    listener: Listener,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    const promises = []

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      const {
        promisesById,
        valuesById,
      } = listener.captureOutputs(
        lid,
        { [instanceId]: instance },
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
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private waitForPromises(
    lid: string[],
    listener: Listener,
    instances: Record<string, any>
  ): void | Promise<any> {
    const promises = []

    for (const instanceId in instances) {
      if (this.promises[instanceId]) {
        promises.push(this.promises[instanceId])
      }

      if (this.joins[instanceId]) {
        for (const [joinIds] of this.joins[instanceId]) {
          for (const joinId of joinIds) {
            const [id] = this.parseId(joinId, listener)

            if (this.promises[id]) {
              promises.push(this.promises[id])
            }
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
