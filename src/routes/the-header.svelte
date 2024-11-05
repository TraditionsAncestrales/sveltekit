<script lang="ts" module>
  // STYLES ********************************************************************************************************************************
  const NAV_BURGER = tv({
    slots: {
      ROOT: ``,
      LINK: `hover:bg-primary block p-4 px-8 font-bold uppercase text-black hover:text-white`,
    },
    variants: {
      isActive: {
        true: { LINK: `bg-primary text-white` },
      },
    },
  });

  const NAV_ITEM = tv({
    base: "text-xs font-bold p-2 uppercase rounded group-data-top:text-white hover:bg-primary hover:text-white",
    variants: { isActive: { true: `bg-primary text-white [view-transition-name:active-page]` } },
  });

  // TYPES *********************************************************************************************************************************
  type Nav = { isActive: boolean; href: string; label: string };
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import * as Sheet from "@/components/ui/sheet";
  import { Store } from "runed";
  import { tv } from "tailwind-variants";
  import ListIcon from "~icons/ph/list";
  import LogoIcon from "~icons/ta/logo";

  // PROPS *********************************************************************************************************************************
  let { class: className } = $props();

  // VARS **********************************************************************************************************************************
  const pageStore = new Store(page);
  let pathname = $derived(pageStore.current.url.pathname);

  let menu = $derived({
    label: "Menu Principal",
    slug: "menu-principal",
    items: [
      { label: "A propos", href: "/articles/la-fondatrice" },
      { label: "Chamanisme", href: "/chamanisme" },
      { label: "Rêves", href: "/reves" },
      { label: "Reiki", href: "/reiki" },
      { label: "Tarot", href: "/tarot" },
      { label: "Boutique", href: "/boutique" },
    ].map((item) => ({ ...item, isActive: pathname.startsWith(item.href) })),
  });

  let navs = $derived(menu.items);
  let leftNavs = $derived(navs.slice(0, Math.ceil(0.5 * navs.length)));
  let rightNavs = $derived(navs.slice(Math.ceil(0.5 * navs.length)));
</script>

<div class="bg-white p-2 group-data-scrolled:bg-white group-data-scrolled:shadow-lg sm:bg-transparent {className}">
  <nav class="container mx-auto flex items-center justify-between sm:justify-center sm:group-data-scrolled:justify-between">
    {@render TheLogo("sm:hidden group-data-scrolled:flex")}
    {@render NavBurger("sm:hidden")}
    {@render NavItems("hidden sm:flex")}
  </nav>
</div>

<!-- THE LOGO -->
{#snippet TheLogo(className: string)}
  <a href="/" aria-label="Retour à l'accueil" class="flex items-center gap-1 {className}">
    <LogoIcon class="h-12 w-12 fill-neutral-800 text-primary hover:text-primary-400" />
    <hgroup class="font-heading uppercase">
      <h3 class="text-sm leading-none text-neutral-800">Traditions</h3>
      <h4 class="text-xs leading-none text-neutral-500">Ancestrales</h4>
    </hgroup>
  </a>
{/snippet}

<!-- NAV BURGER -->
{#snippet NavBurger(className: string)}
  {@const { LINK, ROOT } = NAV_BURGER()}
  <Sheet.Root>
    <Sheet.Trigger class={ROOT({ className })}><ListIcon /></Sheet.Trigger>
    <Sheet.Content>
      {#each menu.items as { href, isActive, label }}
        <a {href} class={LINK({ isActive })}>{label}</a>
      {/each}
    </Sheet.Content>
  </Sheet.Root>
{/snippet}

<!-- NAV ITEMS -->
{#snippet NavItems(className: string)}
  <ul class="flex items-center {className}">
    {#each leftNavs as nav}{@render NavItem(nav)}{/each}
    <li>
      <a href="/">
        <LogoIcon class="mx-8 h-20 w-20 fill-neutral-800 text-primary hover:text-primary-400 group-data-scrolled:hidden" />
      </a>
    </li>
    {#each rightNavs as nav}{@render NavItem(nav)}{/each}
  </ul>
{/snippet}

<!-- NAV ITEM -->
{#snippet NavItem({ href, isActive, label }: Nav)}
  <li class="mx-1">
    <a {href} class={NAV_ITEM({ isActive })}>{label}</a>
  </li>
{/snippet}
