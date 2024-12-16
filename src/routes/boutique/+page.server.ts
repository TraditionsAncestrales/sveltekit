import { VERCEL_REVALIDATE_TOKEN } from "$env/static/private";
import { getProducts } from "@/lib/pocketbase";
import type { PageServerLoad } from "./$types";

// CONFIG **********************************************************************************************************************************
export const config = { isr: { bypassToken: VERCEL_REVALIDATE_TOKEN } };

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals }) => {
  const products = await getProducts(locals);
  const seo = { title: "La Boutique", description: "Retrouvez tous mes produits dans la boutique." };
  return { products, seo };
};
