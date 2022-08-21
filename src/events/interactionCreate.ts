import { ChatInputCommandInteraction, Client } from "discord.js";
import { COMMAND_HANDLERS } from "../commands";
import { IEvent } from "../types";

const eventData: IEvent = {
  event: "interactionCreate",
  handler: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!interaction.isChatInputCommand()) return;
    if (!client?.user) return;

    const { commandName } = interaction;

    const callback = COMMAND_HANDLERS?.[commandName];
    if (!callback) interaction.reply("Unknown command");

    await callback(interaction, client);
  },
};

export default eventData;
