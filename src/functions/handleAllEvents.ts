import { Client } from "discord.js";
import { EVENTS } from "../events";

const handleAllEvents = async (client: Client) => {
  try {
    for (const event of EVENTS) {
      const eventName = event.event;
      const once = event?.once ?? false;
      const eventHandler = event.handler;

      if (once)
        client.once(eventName, (...args) => eventHandler(...args, client));
      else client.on(eventName, (...args) => eventHandler(...args, client));
    }
  } catch (error: any) {
    console.log("Error handling all events", error?.message);
    console.error(error);
  }
};

export default handleAllEvents;
