<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type KnowledgePageProps = { data: PageServerData };
</script>

<script lang="ts">
  import PostsItem from "@/components/posts-item.svelte";
  import RecordsItems from "@/components/records-items.svelte";
  import type { Intent } from "@/styles/ui";
  import type { PageServerData } from "./$types";
  import TheTestimonies from "./the-testimonies.svelte";

  // PROPS *********************************************************************************************************************************
  let { data }: KnowledgePageProps = $props();

  // VARS **********************************************************************************************************************************
  let { consultations, events, post, testimonies, testimoniesImage, trainings, workshops } = $derived(data);
  let count = $derived(+(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0));
  let eventIntent: Intent = $derived(count > 0 ? "primary" : "light");
</script>

<PostsItem {post} border="top" />
<RecordsItems title="Consultation" items={consultations} intent={count > 1 ? "primary" : "light"} />
<RecordsItems title="Atelier" items={workshops} intent="light" />
<RecordsItems title="Formation" items={trainings} intent={count === 3 ? "white" : "light"} />
<RecordsItems title="Événement" items={events} border="bottom" intent={eventIntent} forceMultiple removeStale externalLink>
  {#snippet None()}<div>
      <p>Retrouvez bientôt ici l'ensemble de mes événements.</p>
      <strong>Vous pouvez déjà en obtenir le programme en me faisant une demande via le formulaire de contact.</strong>
    </div>{/snippet}
</RecordsItems>
<TheTestimonies items={testimonies} image={testimoniesImage} />
