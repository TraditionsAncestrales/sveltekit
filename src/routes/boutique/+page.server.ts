import { dev } from "$app/environment";
import { getShopPage } from "@/lib/api";
import type { PageServerLoad } from "./$types";

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals: { pocketbase } }) => {
  const { products } = await getShopPage({ pocketbase, cache: dev ? "1d" : undefined });
  const seo = { title: "La Boutique", description: "Retrouvez tous mes produits dans la boutique." };
  return { products, seo };
};
