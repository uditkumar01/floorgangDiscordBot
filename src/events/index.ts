import path from "path";
import fs from "fs";

const eventsDir = path.join(__dirname, ".");

const excludeFiles = ["index.ts", "index.js"];

const eventFiles = fs
  .readdirSync(eventsDir)
  .filter((file) => file.endsWith(".ts") && !excludeFiles.includes(file));

export const EVENTS = eventFiles
  .map((eventFile) => {
    const eventHandlerObj = require(path.join(eventsDir, eventFile)).default;
    return eventHandlerObj;
  })
  .filter((eventHandlerObj) => eventHandlerObj?.event != undefined);
