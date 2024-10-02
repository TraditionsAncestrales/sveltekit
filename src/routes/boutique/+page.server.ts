import { getShopPage } from "@/lib/pocketbase/api";
import { itemFromProduct } from "@/lib/pocketbase/utils";
import type { PageServerLoad } from "./$types";

// LOAD ************************************************************************************************************************************
export const load: PageServerLoad = async ({ locals }) => {
  const data = await getShopPage(locals);
  const products = data.products.map((product) => itemFromProduct(product));
  return { products };
};
