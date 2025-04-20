declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_DATABASE_ID: string;
    CLOUDFLARE_TOKEN: string;
    APP_ENV?: string;
    APP_DOMAIN: string;
    DB: D1Database;
    JWT_VERIFY_TOKEN_SECRET: string;
    JWT_VERIFY_TOKEN_EXPIRES_IN: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
    RESEND_API_KEY: string;
    NOREPLY_EMAIL: string extends SystemEmail ? string : never;
    APP_URL: string;
    DATABASE_URL?: string;
    CI?: string;
    TEST?: string;
  }
}
