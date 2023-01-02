import {cva} from 'class-variance-authority';
import type {Intent} from '~/schemas/ui';

// TYPES ===================================================================================================================================
export const bg = (intent: Intent) =>
  ({dark: 'bg-neutral-800', light: 'bg-neutral-200', primary: 'bg-primary', secondary: 'bg-neutral-600', white: 'bg-white'}[intent]);

export const hoverBg = (intent: Intent) =>
  ({
    dark: 'hover:bg-neutral-700',
    light: 'hover:bg-neutral-100',
    primary: 'hover:bg-primary-400',
    secondary: 'hover:bg-neutral-500',
    white: 'hover:bg-white',
  }[intent]);

export const focusRing = (intent: Intent) =>
  ({
    dark: 'focus:ring-neutral-600',
    light: 'focus:ring-white',
    primary: 'focus:ring-primary-300',
    secondary: 'focus:ring-neutral-400',
    white: 'focus:ring-white',
  }[intent]);

export const disabledBg = (intent: Intent) =>
  ({
    dark: 'disabled:bg-neutral-700',
    light: 'disabled:bg-neutral-100',
    primary: 'disabled:bg-primary-400',
    secondary: 'disabled:bg-neutral-500',
    white: 'disabled:bg-white',
  }[intent]);

export const btnIntent = (intent: Intent) => [bg(intent), hoverBg(intent), disabledBg(intent), focusRing(intent)].join(' ');

export const text = (intent: Intent) =>
  ({dark: 'text-neutral-800', light: 'text-neutral-200', primary: 'text-primary', secondary: 'text-neutral-600', white: 'text-white'}[
    intent
  ]);

export const BTN = cva(
  `flex items-center font-medium rounded px-5 py-2.5 
  disabled:cursor-not-allowed
  focus:ring-4 focus:outline-none`,
  {
    variants: {
      intent: {
        dark: [text('white'), btnIntent('dark')],
        light: [text('dark'), btnIntent('light')],
        primary: [text('white'), btnIntent('primary')],
        secondary: [text('white'), btnIntent('secondary')],
        white: [text('dark'), btnIntent('white')],
      },
    },
    defaultVariants: {intent: 'primary'},
  }
);

export const INPUT = cva(
  `block w-full p-2.5 text-sm border border-neutral-300 
  focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300`,
  {
    variants: {
      touched: {
        true: `invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500`,
      },
    },
  }
);

export const TITLE = cva(`font-heading text-2xl first-letter:text-primary first-letter:text-4xl`);
