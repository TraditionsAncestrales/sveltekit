import { ZOD_POCKETBASE_URL } from "$env/static/private";
import type { TypedPocketbase } from "@/lib/pocketbase/schemas";
import Pocketbase from "pocketbase";

let pocketbase: TypedPocketbase;

export function getPocketbase() {
  if (!pocketbase) pocketbase = new Pocketbase(ZOD_POCKETBASE_URL);
  return pocketbase;
}
