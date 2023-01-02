
// BAN NULL ================================================================================================================================
export const banNull = <V>(value: V): BanNull<V> => (value ?? undefined) as BanNull<V>;

// FILL ====================================================================================================================================
export const fill = <V>(value: V) => {
  return <K extends string = string>(...keys: K[]): Record<K, V> => Object.fromEntries(keys.map((key) => [key, value])) as Record<K, V>;
};

// IS EMAIL ================================================================================================================================
const matcher = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;
export const isEmail = (value: string) => value.length <= 320 && matcher.test(value);

// TYPES ===================================================================================================================================
type BanNull<T> = T extends null ? undefined : T;
