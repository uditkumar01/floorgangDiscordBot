import {
  ActionRowBuilder,
  Client,
  ModalBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const titleInput = new TextInputBuilder()
  .setLabel("Title")
  .setCustomId("postTitle")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const contentInput = new TextInputBuilder()
  .setLabel("Content")
  .setCustomId("postContent")
  .setStyle(TextInputStyle.Paragraph)
  .setRequired(true);

const firstActionRow = new ActionRowBuilder().addComponents(titleInput) as any;
const secondActionRow = new ActionRowBuilder().addComponents(
  contentInput
) as any;

const modal = new ModalBuilder()
  .setTitle("Create Post")
  .setCustomId("postMessage")
  .addComponents(firstActionRow, secondActionRow);

const command = new SlashCommandBuilder()
  .setName("post")
  .setDescription("Post a message")
  .toJSON();

const handler = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  if (!client?.user) return;
  try {
    await interaction.showModal(modal);
  } catch (error: any) {
    console.log("Error handling ping", error?.message);
    console.error(error);
    interaction.reply({
      content: "OOPS! Something went wrong :(",
      ephemeral: true,
    });
  }
};

export { command, handler };
