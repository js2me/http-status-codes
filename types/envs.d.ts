declare interface BuildEnvariables {
  VERSION: string;
  DEV: boolean;
  BASE_URL: string;
  PREVIEW: boolean;
  LOGGER?: boolean;
}

declare const buildEnvs: BuildEnvariables;
