<svelte:window bind:scrollY />
<div class="group theme-{theme}" data-scrolled={isScrolled}>
  <TheHeader menu={menuWithActiveItems} class="z-30 fixed top-0 left-0 w-full" />
  <TheHero class={cHeroH} {...hero} />
  <slot />
  <KnowledgeItems items={others} />
  <NewsletterSection border="top" intent="primary" />
  {#if isHome}<ContactSection intent="light" />{:else}<UiItems items={[organization]} class="mb-4" />{/if}
  <TheFooter {...footer} />
</div>

<script lang="ts">
  import '@fontsource/raleway';
  import '@fontsource/raleway/400-italic.css';
  import '@fontsource/raleway/700.css';
  import '@splidejs/svelte-splide/css';
  import '../styles/base.css';
  import '../styles/theme.css';

  import {page} from '$app/stores';
  import ContactSection from '~/components/contact-section.svelte';
  import KnowledgeItems from '~/components/knowledge-items.svelte';
  import NewsletterSection from '~/components/newsletter-section.svelte';
  import TheFooter from '~/components/the-footer.svelte';
  import TheHeader from '~/components/the-header.svelte';
  import TheHero from '~/components/the-hero.svelte';
  import UiItems from '~/components/ui-items.svelte';

  // VARS ==================================================================================================================================
  let scrollY: number;
  $: ({footer, hero, menu, organization, others, pageType, theme} = $page.data.layout);
  $: isKnowledge = ['knowledge', 'page'].includes(pageType);
  $: isHome = isKnowledge && theme === 'general';
  $: isScrolled = scrollY > 0;
  $: menuWithActiveItems = {...menu, items: menu.items.map((item) => ({...item, isActive: $page.url.pathname.startsWith(item.to)}))};

  // STYLES ================================================================================================================================
  $: cHeroH = isKnowledge ? 'h-screen' : 'h-[640px]';
</script>
