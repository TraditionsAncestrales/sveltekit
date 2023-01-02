{#if markTypeIs('link')}<a {...props} class="text-primary"><slot /></a>
{:else}<Mark {...props}><slot /></Mark>{/if}

<script lang="ts">
import {Mark} from 'astro-portabletext/components';

import type {MarkProps} from 'astro-portabletext/components';

const props = Astro.props;
const markTypeIs = (markType: string) => markType === props.node.markType;

export type Props = MarkProps;
</script>