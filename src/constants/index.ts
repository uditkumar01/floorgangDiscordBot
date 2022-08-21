import { config } from "dotenv";

config();

const envs = {
  BOT_TOKEN: process.env.BOT_TOKEN ?? "",
  CLIENT_ID: process.env.CLIENT_ID ?? "",
  GUILD_ID: process.env.GUILD_ID ?? "",
  BOT_NAME: process.env.BOT_NAME ?? "",
  DB_PASS: process.env.DB_PASS ?? "",
  DB_URL: process.env.DB_URL ?? "",
  DB_API_KEY: process.env.DB_API_KEY ?? "",
};

// check if all envs are defined and throw error if not

Object.keys(envs).forEach((key) => {
  if (!envs?.[key as keyof typeof envs])
    throw new Error(`${key} is not defined in .env`);
});

export default envs;
