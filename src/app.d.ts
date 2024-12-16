import type { TypedPb } from "@/lib/pocketbase";
import "unplugin-icons/types/svelte";
import type { helpersFrom } from "zod-pocketbase";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      getRecord: ReturnType<typeof helpersFrom>["getRecord"];
      getRecords: ReturnType<typeof helpersFrom>["getRecords"];
      pocketbase: TypedPb;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
