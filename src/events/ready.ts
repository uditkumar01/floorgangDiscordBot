import { Client } from "discord.js";
import { IEvent } from "../types";

const eventData: IEvent = {
  event: "ready",
  once: true,
  handler: async (client: Client) => {
    if (!client?.user) return;
    console.log(`Logged in as ${client.user.tag}!`);
  },
};

export default eventData;
