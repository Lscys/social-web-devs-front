interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_MODE: string;
    
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}