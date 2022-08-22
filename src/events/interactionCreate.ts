import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { COMMAND_HANDLERS } from "../commands";
import { MODAL_INTERACTION_HANDLERS } from "../interactions/modals";
import { IEvent } from "../types";

const eventData: IEvent = {
  event: "interactionCreate",
  handler: async (interaction: Interaction, client: Client) => {
    if (!client?.user) return;

    if (interaction.isChatInputCommand()) {
      const commandName = interaction.commandName;
      const callback = COMMAND_HANDLERS?.[commandName];
      if (!callback) interaction.reply("Unknown command");

      await callback(interaction, client);
    } else if (interaction.isModalSubmit()) {
      const modalCustomID = interaction.customId;

      const callback = MODAL_INTERACTION_HANDLERS?.[modalCustomID];
      if (!callback) interaction.reply("Unknown command");
      await callback(interaction, client);
    }
  },
};

export default eventData;
