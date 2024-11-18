import { dev } from "$app/environment";
import { VERCEL_REVALIDATE_TOKEN } from "$env/static/private";
import { getShopPage } from "@/lib/api";
import type { PageServerLoad } from "./$types";

// CONFIG **********************************************************************************************************************************
export const config = { isr: { bypassToken: VERCEL_REVALIDATE_TOKEN } };

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals: { pocketbase } }) => {
  const { products } = await getShopPage({ pocketbase, cache: dev ? "1d" : undefined });
  const seo = { title: "La Boutique", description: "Retrouvez tous mes produits dans la boutique." };
  return { products, seo };
};
