/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_PORTFOLIO_LINKEDIN?: string;
  readonly VITE_PORTFOLIO_EMAIL?: string;
  readonly VITE_PORTFOLIO_BACK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
