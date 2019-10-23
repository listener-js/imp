import { ListenerEvent } from "@listener-js/listener"

export type ListenerJoinOptions = {}

export type ListenerJoins =
  | string[]
  | (string | ListenerJoinOptions)[][]

export interface ListenerJoinEvent extends ListenerEvent {
  joinInstance: any
}

export type ListenerJoin = (
  lid: string[],
  instanceId: string,
  ...joins: ListenerJoins
) => void
