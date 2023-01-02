{#if styleIs('normal')}<p {...props} class="text-justify mb-1"><slot /></p>
{:else if styleIs('h3')}<h3 {...props} class="font-bold text-xl my-2"><slot /></h3>
{:else}<Block {...props}><slot /></Block>{/if}

<script lang="ts">
import type {PortableTextBlockStyle} from '@portabletext/types';
import {Block} from 'astro-portabletext/components';

import type {BlockProps} from 'astro-portabletext/components';

const props = Astro.props;
const styleIs = (style: PortableTextBlockStyle) => style === props.node.style;

export type Props = BlockProps;
</script>