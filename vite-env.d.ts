// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  VITE_CLERK_PUBLISHABLE_KEY: string;
  // add more variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
