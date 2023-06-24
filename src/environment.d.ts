declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: 'development' | 'production' | 'test';
      CERT_FILE: string;
      PRIVKEY_FILE: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_INITDB: string;
      DB_PORT: number;
      DB_HOST: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
