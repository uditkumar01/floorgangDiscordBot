import { supabaseClient } from "./client";

const createPost = async (
  title: string,
  content: string,
  author: {
    id: string;
    username: string;
    avatarURL: string | null;
  }
) => {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient.from("posts").upsert({
      title,
      content,
      authorID: author.id,
      authorUsername: author.username,
      authorAvatarURL: author.avatarURL,
    });

    if (error) throw new Error(error.message);

    return data;
  } catch (error: any) {
    console.log("Error creating post", error?.message);
    console.error(error);
  }
};

export default createPost;
