import { ListenerEvent } from "@listener-js/listener"

export type ListenerJoinsOptions = {}

export type ListenerJoins = [
  string[],
  ListenerJoinsOptions?
][]

export interface ListenerJoinEvent extends ListenerEvent {
  joinInstance: any
}
