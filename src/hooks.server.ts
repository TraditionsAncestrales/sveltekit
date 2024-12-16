import { dev } from "$app/environment";
import { type Handle } from "@sveltejs/kit";
import { helpersFrom } from "zod-pocketbase";
import { getPocketbase } from "./lib/pocketbase/server";

export const handle: Handle = async ({ event, resolve }) => {
  const pocketbase = getPocketbase();
  const { getRecord, getRecords } = helpersFrom({ pocketbase, cache: dev ? "1d" : undefined });
  event.locals = { getRecord, getRecords, pocketbase };
  return resolve(event);
};
