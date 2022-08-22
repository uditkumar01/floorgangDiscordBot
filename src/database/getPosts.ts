import { supabaseClient } from "./client";

const getPosts = async (authorID: string, limit: number) => {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from("posts")
      .select("content,title,authorUsername,authorAvatarURL,createdAt")
      .eq("authorID", authorID)
      .limit(limit)
      .order("createdAt", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  } catch (error: any) {
    console.log("Error creating post", error?.message);
    console.error(error);
  }
};

export default getPosts;
