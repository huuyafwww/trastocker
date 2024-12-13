import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

import type { Config } from 'drizzle-kit';

dotenv.config();

const config = process.env.DATABASE_URL
  ? ({
      dialect: 'sqlite',
      schema: './src/schema/tables/*',
      out: './migrations',
      dbCredentials: {
        url: process.env.DATABASE_URL as unknown as string,
      },
    } satisfies Config)
  : ({
      dialect: 'sqlite',
      driver: 'd1-http',
      schema: './src/schema/tables/*',
      out: './migrations',
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID,
        token: process.env.CLOUDFLARE_TOKEN,
      },
    } satisfies Config);

export default defineConfig(config);
