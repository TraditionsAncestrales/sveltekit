<UiItems ignoreSingle {items} title="Événements" {...$$restProps}>
  <div>
    <p>Retrouvez bientôt ici l'ensemble de mes événements.</p>
    <strong>Vous pouvez déjà en obtenir le programme en me faisant une demande via le formulaire de contact.</strong>
  </div>
</UiItems>

<script lang="ts">
  import type {EventItemsP} from '~/schemas/ui';
  import UiItems from './ui-items.svelte';

  // PROPS ===================================================================================================================================
  export let items: EventItemsP['items'] = [];
</script>
