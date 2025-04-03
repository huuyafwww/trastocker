import type { HtmlEmail } from './html-email.entity';
import type { ReactEmail } from './react-email.entity';
import type { TextEmail } from './text-email.entity';

export type Email = ReactEmail | HtmlEmail | TextEmail;
