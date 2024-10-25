<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type KnowledgePageProps = { data: PageServerData };
</script>

<script lang="ts">
  import PostsItem from "@/components/posts-item.svelte";
  import RecordsItems from "@/components/records-items.svelte";
  import type { PageServerData } from "./$types";
  import TheTestimonies from "./the-testimonies.svelte";

  // PROPS *********************************************************************************************************************************
  let { data }: KnowledgePageProps = $props();

  // VARS **********************************************************************************************************************************
  let { consultations, events, post, testimonies, trainings, workshops } = $derived(data);
  let count = $derived(+(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0));
</script>

<PostsItem {post} border="top" class={{ ASIDE: "!max-w-sm" }} />
<RecordsItems title="Consultation" items={consultations} intent={count > 1 ? "primary" : "light"} />
<RecordsItems title="Atelier" items={workshops} intent="light" />
<RecordsItems title="Formation" items={trainings} intent={count === 3 ? "white" : "light"} />
<RecordsItems title="Événement" items={events} border="bottom" intent={count > 0 ? "primary" : "light"}>
  {#snippet None()}<div>
      <p>Retrouvez bientôt ici l'ensemble de mes événements.</p>
      <strong>Vous pouvez déjà en obtenir le programme en me faisant une demande via le formulaire de contact.</strong>
    </div>{/snippet}
</RecordsItems>
<TheTestimonies {...testimonies} />
