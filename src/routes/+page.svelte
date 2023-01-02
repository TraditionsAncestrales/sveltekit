<UiItems items={[{...article, title: 'Bienvenue'}]} border="top" cAside="!max-w-sm" />
<EventItems items={events} intent="light" />
<TestimonySection {testimonies} />
<UiItems items={[layout.organization]} border="bottom" intent="primary" />

<script lang="ts">
  import EventItems from '~/components/event-items.svelte';
  import TestimonySection from '~/components/testimony-section.svelte';
  import UiItems from '~/components/ui-items.svelte';
  import type {PageServerData} from './$types';

  // PROPS ==================================================================================================================================
  export let data: PageServerData;

	 // VARS ==================================================================================================================================
	 $: ({article, events, layout, testimonies} = data);
</script>
