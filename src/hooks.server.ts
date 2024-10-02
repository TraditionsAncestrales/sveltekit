import { AssetCache } from "@11ty/eleventy-fetch";
import { json, type Handle } from "@sveltejs/kit";
import { getPb } from "./lib/pocketbase/server";

export const handle: Handle = async ({ event, resolve }) => {
  const { getRecord, getRecords, pb } = getPb(event.fetch);
  event.locals.pb = pb;
  // @ts-expect-error: monkey patching
  event.locals.getRecord = getRecord;
  event.locals.getRecords = getRecords;
  return resolve(event);
};

export async function handleFetch({ request, fetch }) {
  const asset = new AssetCache(request.url);
  if (asset.isCacheValid("1d")) {
    const value = await asset.getCachedValue();
    return json(value);
  }
  const response = await fetch(request);
  if (!response.ok) return response;
  const data = await response.clone().json();
  await asset.save(data, "json");
  return response;
}
