export type ManifestV2 = chrome.runtime.ManifestV2
export type Manifest = chrome.runtime.ManifestV3

export interface ManifestParserInterface {
  convertManifestToString: (manifest: Manifest, isFirefox: boolean) => string;
}
