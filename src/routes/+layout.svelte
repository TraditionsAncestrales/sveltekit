<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type LayoutProps = { children: Snippet; data: LayoutServerData };
</script>

<script lang="ts">
  import "@/styles/globals.css";
  import "@/styles/theme.css";
  import TheHeader from "./the-header.svelte";
  import { cn } from "@/lib/utils";
  import type { LayoutServerData } from "./$types";
  import type { Snippet } from "svelte";
  import { Image } from "@unpic/svelte";
  import PostsItem from "@/lib/components/posts-item.svelte";
  import { Section } from "@/lib/components/ui/section";
  import { Title } from "@/lib/components/ui/title";
  import { BUTTON } from "@/lib/components/ui/button";
  import TheNewsletter from "./the-newsletter.svelte";
  import { Toaster } from "@/lib/components/ui/sonner";
  import AdressIcon from "~icons/bi/pin-map";
  import EmailIcon from "~icons/ph/at";
  import PhoneIcon from "~icons/bi/phone";
  import FacebookIcon from "~icons/ph/facebook-logo-thin";
  import InstagramIcon from "~icons/ph/instagram-logo-thin";
  import YoutubeIcon from "~icons/ph/youtube-logo-thin";
  import TheContact from "./the-contact.svelte";

  // PROPS *********************************************************************************************************************************
  let { children, data }: LayoutProps = $props();
  let { config, hero, organizationPost, otherKnowledges, svContact, svNewsletter, theme } = $derived(data);

  // VARS **********************************************************************************************************************************
  let scrollY = $state(0);
  let isScrolled = $derived(scrollY > 0);
  let isMain = true;
  let isHome = $derived(isMain && theme === "traditions-ancestrales");
</script>

<svelte:window bind:scrollY />
<div class="group" data-scrolled={isScrolled} data-theme={theme}>
  <TheHeader class="fixed left-0 top-0 z-30 w-full" />
  {@render TheHero(isMain ? "h-screen" : "h-[50vh]")}
  {@render children()}
  {#if isHome}<PostsItem post={organizationPost} border="bottom" intent="primary" />{/if}
  {@render TheOtherKnowledges()}
  <TheNewsletter sv={svNewsletter} border="top" intent="primary" />
  {#if isHome}<TheContact sv={svContact} intent="light" />{:else}<PostsItem post={organizationPost} class="mb-4" />{/if}
  {@render TheFooter()}
  <Toaster richColors theme="light" />
</div>

<!-- THE HERO -->
{#snippet TheHero(className: string)}
  {@const { image, subtitle, title } = hero}
  {@const cMask = `[mask-image:url(/splash.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]`}
  <div class={cn("relative flex w-full items-center justify-center bg-cover bg-center font-bold", className)}>
    <Image {...image} layout="fullWidth" priority objectFit="cover" class="absolute inset-0 h-full w-full" />
    <div class="relative py-40 text-center uppercase tracking-widest text-white">
      <div class={cn("absolute inset-0 bg-primary", cMask)}></div>
      <h1 class="relative my-2 max-w-2xl text-4xl sm:text-7xl">{title}</h1>
      <h2 class="relative text-xs">{subtitle}</h2>
    </div>
  </div>
{/snippet}

<!-- THE OTHER KNOWLEDGES -->
{#snippet TheOtherKnowledges()}
  {@const cAbs = `absolute inset-0 w-full h-full transition-transform duration-500`}
  <div class="-my-16 lg:flex">
    {#each otherKnowledges as { href, image, slug, text, title }, i}
      <Section intent="primary" class={cn("lg:hidden", { "pt-16": i === 0, "pb-20": i === otherKnowledges.length - 1 })} data-theme={slug}>
        {#snippet Header()}<Title text={title} class="mb-8" />{/snippet}
        {#snippet Aside()}<Image
            {...image}
            objectFit="cover"
            width={512}
            sizes="(min-width: 768px) 20rem, (min-width: 640px) 36rem, 100vw"
            aspectRatio={3 / 2}
            class="relative aspect-[3/2] shadow-lg shadow-black/50"
          />{/snippet}
        <article>{@html text}</article>
        <a {href} class={BUTTON({ intent: "secondary", className: "self-end" })}> En savoir plus </a>
      </Section>

      <a
        {href}
        class="group/k relative hidden h-[600px] w-1/4 flex-col items-center justify-center overflow-hidden lg:flex"
        data-theme={slug}
      >
        <Image {...image} objectFit="cover" height={600} width={512} sizes="25vw" class={cn(cAbs, "-z-20 group-hover/k:scale-105")} />
        <div class={cn(cAbs, "-z-10 translate-y-full bg-primary group-hover/k:translate-y-0")}>
          <div class="mt-[150px] px-4 text-center">
            <article>{@html text}</article>
          </div>
        </div>
        <Title
          text={title}
          class={{
            ROOT: "transition-transform duration-500 group-hover/k:-translate-y-[200px]",
            STAIN: "text-primary",
            TEXT: "px-12 py-6 text-4xl text-black",
          }}
        />
      </a>
    {/each}
  </div>
{/snippet}

<!-- THE FOOTER -->
{#snippet TheFooter(className?: string)}
  {@const { email, facebook, instagram, phone, street, zipcode, city } = config}
  {@const SOCIAL = "text-primary hover:text-primary-300"}
  <Section border="top" intent="dark" class={cn("items-center text-white", className)}>
    <div class="container flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
      <div class="flex flex-col">
        <div class="flex items-center gap-4 p-3">
          <AdressIcon class="h-6 w-6 text-primary" />
          <span class="flex-auto">
            <div>{street}</div>
            <div>{zipcode} {city}</div>
          </span>
        </div>
        <a href={"mailto:" + email} class="group/email">
          <div class="flex items-center gap-4 p-3">
            <EmailIcon class="h-6 w-6 text-primary group-hover/email:text-primary-400" />
            <span class="flex-auto">
              <div>{email}</div>
            </span>
          </div>
        </a>
        <a href={"tel:" + phone} class="group/phone">
          <div class="flex items-center gap-4 p-3">
            <PhoneIcon class="h-6 w-6 text-primary group-hover/phone:text-primary-400" />
            <span class="flex-auto">
              <div>{phone}</div>
            </span>
          </div>
        </a>
      </div>
      <div class="flex flex-col gap-3 sm:items-end">
        <div class="flex items-center justify-center gap-4">
          <a href={facebook} class={SOCIAL} aria-label="Facebook"><FacebookIcon class="h-12 w-12" /></a>
          <a href={instagram} class={SOCIAL} aria-label="Instagram"><InstagramIcon class="h-12 w-12" /></a>
          <a href="/" class={SOCIAL} aria-label="Youtube"><YoutubeIcon class="h-12 w-12" /></a>
        </div>
        <hr class="w-full border-dashed border-neutral-200" />
        <div class="flex flex-col items-end">
          <span>©2022 L'ENVOL - LA RÉUNION</span>
          <span class="text-sm">Tous droits réservés</span>
        </div>
        <a href="/articles/mentions-legales" class="self-end text-sm text-neutral-400 hover:text-white">mentions légales</a>
      </div>
    </div>
  </Section>
{/snippet}
