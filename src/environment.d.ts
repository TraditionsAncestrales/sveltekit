declare module "@11ty/eleventy-fetch" {
  class AssetCache {
    constructor(url: string);
    isCacheValid: (duration: string) => boolean;
    getCachedValue: <Value>() => Promise<Value>;
    save: <Value>(value: Value, type: "json") => Promise<void>;
  }
}
