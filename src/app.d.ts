import type { TypedPb } from "@/lib/pocketbase";
import type { RecordRef } from "@/lib/pocketbase/schemas";
import type { RecordOpts, RecordsOpts } from "@/lib/pocketbase/server";
import "unplugin-icons/types/svelte";
import type { z } from "zod";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      getRecord: (ref: RecordRef, options?: RecordOpts) => <S extends z.AnyZodObject>(schema: S) => Promise<S["_output"]>;
      getRecords: (collection: Collection, options?: RecordsOpts) => <S extends z.AnyZodObject>(schema: S) => Promise<S["_output"][]>;
      pb: TypedPb;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
