import {
  Listener,
  ListenerBind,
} from "@listener-js/listener"

export class Imp {
  private instances: Record<string, any> = {}
  private promises: Record<string, Promise<any>> = {}
  private resolvers: Record<string, Function> = {}

  listenerBind(
    lid: string[],
    instanceId: string
  ): ListenerBind {
    return [
      [
        ["listener.instancesLoaded", "**"],
        `${instanceId}.anyInstancesLoaded`,
        { prepend: true },
      ],
      [
        ["listener.instanceLoaded", "**"],
        `${instanceId}.anyInstanceLoaded`,
        { prepend: true },
      ],
      [
        ["listener.reset", "**"],
        `${instanceId}.listenerReset`,
        { prepend: true },
      ],
    ]
  }

  public listenerReset(lid: string[]): void {
    this.instances = {}
    this.promises = {}
    this.resolvers = {}
  }

  private anyInstancesLoaded(
    lid: string[],
    instances: Record<string, any>
  ): void {
    for (const instanceId in instances) {
      this.instances[instanceId] = instances[instanceId]
    }
  }

  private anyInstanceLoaded(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any> {
    const promises = this.externalPromises(
      instanceId,
      instance,
      listener
    )

    if (instance.then) {
      instance
        .then((instance):
          | Record<string, any>
          | Promise<Record<string, any>> => {
          this.instances[instanceId] = instance

          return listener.load(
            lid,
            { [instanceId]: instance },
            options
          )
        })
        .then(() => this.resolvers[instanceId]())
    } else if (instance.externals) {
      for (const joinId of instance.externals) {
        const [loadInstanceId, fnId] = listener.parseId(
          joinId
        )

        if (fnId) {
          instance[fnId] = (
            id: string[],
            ...args: any[]
          ): any => {
            return listener.instances[loadInstanceId][fnId](
              [`${instanceId}.${fnId}`, ...id],
              ...args
            )
          }
        } else {
          instance[joinId] = listener.instances[joinId]
        }
      }
    }

    const externalCallbacks = this.externalCallbacks(
      lid,
      instanceId,
      instance,
      listener,
      options
    )

    if (promises.length || externalCallbacks.length) {
      return Promise.all(promises).then(() => {
        return Promise.all(externalCallbacks)
      })
    }
  }

  private externalCallbacks(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): Promise<any>[] {
    if (!instance.externals) {
      return []
    }

    return instance.externals.reduce((memo, loadId) => {
      const [loadInstanceId] = listener.parseId(loadId)
      const id = loadInstanceId || loadId

      if (
        this.instances[id] &&
        this.instances[id].listenerJoin
      ) {
        const out = this.instances[id].listenerJoin(
          lid,
          instanceId,
          instance,
          listener,
          options
        )

        if (out && out.then) {
          return memo.concat(out)
        }
      }

      return memo
    }, [])
  }

  private externalPromises(
    instanceId: string,
    instance: any,
    listener: Listener
  ): Promise<any>[] {
    let promises = []

    if (!instance) {
      return promises
    }

    if (instance.then) {
      this.promises[instanceId] =
        this.promises[instanceId] ||
        new Promise((resolve): void => {
          this.resolvers[instanceId] = resolve
        })

      promises = [this.promises[instanceId]]
    } else if (instance.externals) {
      for (const instanceId of instance.externals) {
        const [loadInstanceId] = listener.parseId(
          instanceId
        )
        const id = loadInstanceId || instanceId

        promises = promises.concat(
          this.externalPromises(
            id,
            this.instances[id],
            listener
          )
        )
      }
    }

    return promises
  }
}

export const imp = new Imp()
