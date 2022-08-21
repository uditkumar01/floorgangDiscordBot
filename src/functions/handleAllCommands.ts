import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import envs from "../constants";
import { COMMANDS } from "../commands";

const { CLIENT_ID, GUILD_ID } = envs;

const refreshCommands = async (rest: REST) => {
  try {
    console.log("Starting refreshing application (/) commands");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: COMMANDS,
    });
  } catch (error: any) {
    console.log("Error refreshing application (/) commands", error?.message);
    console.error(error);
  }
};

export default refreshCommands;
