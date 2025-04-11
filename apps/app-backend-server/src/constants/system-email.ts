export const SYSTEM_EMAIL_KEYS = ['register'] as const;

export type SYSTEM_EMAIL_TYPE = {
  register: typeof SYSTEM_EMAIL['register'];
};

export class SYSTEM_EMAIL {
  static get register() {
    return process.env.NOREPLY_EMAIL;
  }
}
