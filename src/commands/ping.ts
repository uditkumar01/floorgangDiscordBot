import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import path from "path";

const pingGif = path.join(__dirname, "..", "..", "assets", "ping.gif");

const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("check if the bot is online")
  .toJSON();

const handler = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  if (!client?.user) return;
  try {
    const imgFile = new AttachmentBuilder(pingGif);
    const imgEmbed = new EmbedBuilder()
      .setTitle("Yeah, I'm here!")
      .setImage("attachment://ping.gif");
    await interaction.deferReply();
    await interaction.editReply({
      content: "pong",
      files: [imgFile],
      embeds: [imgEmbed],
    });
  } catch (error: any) {
    console.log("Error handling ping", error?.message);
    console.error(error);
    interaction.reply("Pong! :ping_pong:");
  }
};

export { command, handler };
