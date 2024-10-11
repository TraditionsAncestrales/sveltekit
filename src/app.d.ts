import type { TypedPb } from "@/lib/pocketbase";
import "unplugin-icons/types/svelte";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pocketbase: TypedPb;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
