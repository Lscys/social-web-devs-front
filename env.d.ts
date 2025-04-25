interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_MODE: string;
    readonly VITE_CLOUD_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}