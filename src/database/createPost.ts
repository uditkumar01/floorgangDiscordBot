import { supabaseClient } from "./client";

const createPost = async (
  content: string,
  authorID: string,
  channelID: string
) => {
  if (!supabaseClient) return;

  try {
    await supabaseClient.from("posts").upsert({
      text: content,
      authorID: authorID,
      channelID: channelID,
    });
  } catch (error: any) {
    console.log("Error creating post", error?.message);
    console.error(error);
  }
};

export default createPost;
