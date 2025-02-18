export const SALT_ROUNDS = process.env.CI || process.env.TEST ? 1 : 10;
