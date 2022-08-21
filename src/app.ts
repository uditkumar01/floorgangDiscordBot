import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import handleAllEvents from "./functions/handleAllEvents";
import envs from "./constants";
import refreshCommands from "./functions/handleAllCommands";

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = envs;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({
  version: "10",
}).setToken(BOT_TOKEN);

// to handle all events
handleAllEvents(client);

// Refresh application (/) commands
refreshCommands(rest);

client.login(BOT_TOKEN);
