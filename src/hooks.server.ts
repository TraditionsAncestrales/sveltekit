import { dev } from "$app/environment";
import { type Handle } from "@sveltejs/kit";
import { helpersFrom } from "zod-pocketbase";
import { getPocketbase } from "./lib/pocketbase/server";
// @ts-expect-error: undefined types
import Fetch from "@11ty/eleventy-fetch";

export const handle: Handle = async ({ event, resolve }) => {
  const pocketbase = getPocketbase();
  const { getRecord, getRecords } = helpersFrom({
    pocketbase,
    ...(dev
      ? {
          fetch: async (url, fetchOptions) => {
            const { body, ...init } = await Fetch(url, { fetchOptions, returnType: "response", type: "json" });
            return new Response(JSON.stringify(body), init);
          },
        }
      : {}),
  });
  event.locals = { getRecord, getRecords, pocketbase };
  return resolve(event);
};
