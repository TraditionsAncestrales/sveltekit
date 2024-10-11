import { type Handle } from "@sveltejs/kit";
import { getPocketbase } from "./lib/pocketbase/server";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pocketbase = getPocketbase();
  return resolve(event);
};
