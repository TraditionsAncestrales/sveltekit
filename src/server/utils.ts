import {z} from 'zod';
import {fill} from '~/data/utils';
import {sanity} from './sanity';

// FILL ====================================================================================================================================
export const fillString = fill(z.string());

// PARSERS =================================================================================================================================
export const parseFormDataValue = <S extends string>(v?: S | 'undefined' | ''): S | undefined =>
  v === 'undefined' || v === '' || !v ? undefined : v;

export const refineFormDataValue = (v: string): boolean => !['undefined', ''].includes(v);

// PROCEDURE ===============================================================================================================================
export const procedure = <I extends any[] = [], O = unknown>(name: string, {debug = false, input, output, query}: ProcedureO<I, O>) => {
  return async (...args: I): Promise<O> => {
    try {
      if (debug) console.debug(`${name} - query:`, query);
      if (debug) console.debug(`${name} - args:`, args);
      const queryParams = input ? input.parse(args) : args;
      if (debug) console.debug(`${name} - params:`, queryParams);
      const raw = await sanity.fetch(query, queryParams);
      if (debug) console.debug(`${name} - raw:`, raw);
      const data = output ? output.parse(raw) : raw;
      if (debug) console.debug(`${name} - data:`, data);
      return data;
    } catch (error) {
      console.log('ERREUR',error);
      throw (error as Error).toString(); //throw error(500, parsed.error.toString());
    }
  };
};

// TYPES ===================================================================================================================================
export type ProcedureO<I extends any[], O> = {debug?: boolean; input?: ZType<any, I>; output?: ZType<O, unknown>; query: string};
export type ZType<O = unknown, I = O> = z.ZodType<O, z.ZodTypeDef, I>;
