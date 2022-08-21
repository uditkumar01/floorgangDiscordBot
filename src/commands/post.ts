import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import path from "path";
import createPost from "../database/createPost";

const pingGif = path.join(__dirname, "..", "..", "assets", "ping.gif");

const command = new SlashCommandBuilder()
  .setName("post")
  .setDescription("post a message")
  .addStringOption((option) =>
    option
      .setName("content")
      .setDescription("the content of the post")
      .setRequired(true)
  )
  .toJSON();

const handler = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  if (!client?.user) return;
  try {
    const authorID = interaction.user.id;
    const channelID = interaction.channelId;
    const content = interaction.options.getString("content", true);
    await createPost(content, authorID, channelID);
    interaction.reply("Post created :white_check_mark:");
  } catch (error: any) {
    console.log("Error handling ping", error?.message);
    console.error(error);
    interaction.reply("OOPS! Something went wrong :(");
  }
};

export { command, handler };
