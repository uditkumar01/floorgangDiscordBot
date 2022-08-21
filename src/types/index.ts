import { ClientEvents } from "discord.js";

export interface IEvent {
  event: keyof ClientEvents;
  handler: Function;
  once?: boolean;
}
