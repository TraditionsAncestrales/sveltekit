<UiSection border="top" intent="dark" class="text-white items-center {cEl}">
  <div class="container flex flex-col justify-between sm:items-center gap-8 sm:flex-row">
    <div class="flex flex-col">
      <div class="flex items-center gap-4 p-3">
        <AddressIcon class="w-6 h-6 text-primary" />
        <span class="flex-auto">
          <div>{street}</div>
          <div>{zipcode} {city}</div>
        </span>
      </div>
      <a href={'mailto:' + email} class="group/email">
        <div class="flex items-center gap-4 p-3">
          <EmailIcon class="w-6 h-6 text-primary group-hover/email:text-primary-400" />
          <span class="flex-auto">
            <div>{email}</div>
          </span>
        </div>
      </a>
      <a href={'tel:' + phone} class="group/phone">
        <div class="flex items-center gap-4 p-3">
          <PhoneIcon class="w-6 h-6 text-primary group-hover/phone:text-primary-400" />
          <span class="flex-auto">
            <div>{phone}</div>
          </span>
        </div>
      </a>
    </div>
    <div class="flex flex-col gap-3 sm:items-end">
      <div class="flex items-center justify-center gap-4">
        <a href="/" class="unstyled text-primary hover:text-primary-200"><FbIcon  class="w-12 h-12" /></a>
        <a href="/" class="unstyled text-primary hover:text-primary-300"><InstaIcon class="w-12 h-12" /></a>
        <a href="/" class="unstyled text-primary hover:text-primary-300"><YtIcon  class="w-12 h-12" /></a>
      </div>
      <hr class="border-dashed border-neutral-200 w-full" />
      <div class="flex flex-col items-end">
        <span>©2022 L'ENVOL - LA RÉUNION</span>
        <span class="text-sm">Tous droits réservés</span>
      </div>
      <a href="/articles/mentions-legales" class="self-end text-sm text-neutral-400 hover:text-white">mentions légales</a>
    </div>
  </div>
</UiSection>

<script lang="ts">
  import type {TheFooterP} from '~/schemas/ui';
  import PhoneIcon from '~icons/bi/phone';
  import AddressIcon from '~icons/bi/pin-map';
  import EmailIcon from '~icons/ph/at';
  import FbIcon from '~icons/ph/facebook-logo-thin';
  import InstaIcon from '~icons/ph/instagram-logo-thin';
  import YtIcon from '~icons/ph/youtube-logo-thin';
  import UiSection from './ui-section.svelte';

  // PROPS ===================================================================================================================================
  export let city: TheFooterP['city'];
  export let email: TheFooterP['email'];
  export let fb: TheFooterP['fb'];
  export let phone: TheFooterP['phone'];
  export let street: TheFooterP['street'];
  export let zipcode: TheFooterP['zipcode'];

  // STYLES ==================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
