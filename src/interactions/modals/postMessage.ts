import {
  Client,
  ModalSubmitInteraction,
  InteractionType,
  EmbedBuilder,
} from "discord.js";
import createPost from "../../database/createPost";

const modalCustomID = "postMessage";

const handler = async (interaction: ModalSubmitInteraction, client: Client) => {
  if (!client?.user) return;
  if (interaction.type.toString() !== InteractionType.ModalSubmit.toString())
    return;
  if (interaction?.customId !== "postMessage") return;
  try {
    const title = interaction.fields.getTextInputValue("postTitle");
    const content = interaction.fields.getTextInputValue("postContent");

    await interaction.deferReply();

    const author = {
      id: interaction.user.id,
      username: interaction.user.username,
      avatarURL: interaction.user.avatarURL(),
    };

    await createPost(title, content, author);

    const postEmbed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(content)
      .setAuthor({
        name: author.username,
        iconURL: author.avatarURL ?? undefined,
      })
      .setTimestamp(new Date());

    await interaction.editReply({
      content: "Posted Successfully",
      embeds: [postEmbed],
    });
  } catch (error: any) {
    console.log("Error handling ping", error?.message);
    console.error(error);
    interaction.reply({
      content: "OOPS! Something went wrong :(",
      ephemeral: true,
    });
  }
};

export { handler, modalCustomID };
