<UiItems items={[article]} border="top" />
<UiItems items={consultations} singular="Consultation" intent={consultationsIntent} />
<UiItems items={workshops} singular="Atelier" intent="light" />
<UiItems items={trainings} singular="Formation" intent={trainingsIntent} />
<EventItems items={events} border="bottom" intent="primary" />

<script lang="ts">
  import EventItems from '~/components/event-items.svelte';
  import UiItems from '~/components/ui-items.svelte';
  import type {PageServerData} from '../$types';

  // PROPS ====================================================================================================================================
  export let data: PageServerData;

  // VARS ==================================================================================================================================
  $: ({article, consultations, events, trainings, workshops} = data);
  $: count = +(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0);
  $: consultationsIntent = count > 1 ? 'primary' : 'light';
  $: trainingsIntent = count === 3 ? 'white' : 'light';
</script>
