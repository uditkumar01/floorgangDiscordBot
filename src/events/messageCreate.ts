import { Client, Message } from "discord.js";
import envs from "../constants";
import { IEvent } from "../types";

const { CLIENT_ID } = envs;

const eventData: IEvent = {
  event: "messageCreate",
  handler: async (msg: Message, client: Client) => {
    console.log(msg.content);
    if (!client?.user) return;
    if (msg.author.id === CLIENT_ID) return;
    if (msg.content === "ping") msg.reply("pong");
  },
};

export default eventData;
