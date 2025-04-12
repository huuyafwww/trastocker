import { v4 as uuidv4 } from 'uuid';

import type { Resend } from 'resend';

// TODO: to Mock Client package
export class MockResend implements Partial<Resend> {
  constructor() {
    Object.assign(this, {
      emails: {
        send: async () => (
          new Promise(resolve => resolve({
            data: { id: uuidv4() },
            error: null,
          }))
        ),
      },
    });
  }
}
