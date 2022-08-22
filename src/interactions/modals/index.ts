import fs from "fs";
import path from "path";

const modalInteractionsDir = path.join(__dirname, ".");

const excludeFiles = ["index.ts", "index.js"];

const modalInteractionFiles = fs
  .readdirSync(modalInteractionsDir)
  .filter((file) => file.endsWith(".ts") && !excludeFiles.includes(file));

export const modalInteractionData = modalInteractionFiles
  .map((modalInteractionFile) => {
    const modalInteractionHandlerObj = require(path.join(
      modalInteractionsDir,
      modalInteractionFile
    ));

    return modalInteractionHandlerObj;
  })
  .filter(
    (modalInteractionHandlerObj) =>
      modalInteractionHandlerObj?.modalCustomID != undefined
  );

export const MODAL_INTERACTION_HANDLERS = modalInteractionData.reduce(
  (acc, modalInteractionHandlerObj) => {
    acc[modalInteractionHandlerObj.modalCustomID] =
      modalInteractionHandlerObj.handler;
    return acc;
  },
  {}
);
