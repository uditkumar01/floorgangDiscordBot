import fs from "fs";
import path from "path";

const commandsDir = path.join(__dirname, ".");

const excludeFiles = ["index.ts", "index.js"];

const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith(".ts") && !excludeFiles.includes(file));

export const commandData = commandFiles
  .map((commandFile) => {
    const commandHandlerObj = require(path.join(commandsDir, commandFile));
    return commandHandlerObj;
  })
  .filter((commandHandlerObj) => commandHandlerObj?.command != undefined);

export const COMMANDS = commandData.map(
  (commandHandlerObj) => commandHandlerObj.command
);

export const COMMAND_HANDLERS = commandData.reduce((acc, commandHandlerObj) => {
  acc[commandHandlerObj.command.name] = commandHandlerObj.handler;
  return acc;
}, {});
