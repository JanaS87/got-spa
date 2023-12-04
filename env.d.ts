/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // Definieren Sie weitere Umgebungsvariablen hier, wenn nötig
    // ...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  