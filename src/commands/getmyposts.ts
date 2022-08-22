import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import getPosts from "../database/getPosts";

const command = new SlashCommandBuilder()
  .setName("getmyposts")
  .setDescription("get your posts")
  .addIntegerOption((option) =>
    option.setName("limit").setDescription("limit the number of posts (max 10)")
  )
  .toJSON();

const handler = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  if (!client?.user) return;
  try {
    const authorID = interaction.user.id;
    const limit = interaction.options.getInteger("limit") ?? 10;

    const posts = await getPosts(authorID, limit);

    if (!posts) throw new Error("No posts found");

    const embeds = posts.map((post) => {
      return new EmbedBuilder()
        .setTitle(post.title)
        .setDescription(post.content)
        .setAuthor({
          name: post.authorUsername,
          iconURL: post.authorAvatarURL,
        })
        .toJSON();
    });

    await interaction.deferReply();

    await interaction.editReply({
      embeds: embeds,
    });
    interaction.reply({});
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
