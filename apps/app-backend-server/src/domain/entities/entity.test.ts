import { User } from '@domain/entities/user.entity';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

describe('integrity', () => {
  it('should hold props.', () => {
    const props = {
      name: 'user',
      email: UserEmail.fromString('admin@admin.com'),
      password: UserPassword.fromRawString('t2t2tN{b((t&'),
      verifiedAt: new Date(),
    };
    const user = User.create(props);
    expect(user.name).toBe(props.name);
    expect(user.email.toString()).toBe(props.email.toString());
    expect(user.password.toString()).toBe(props.password.toString());
    expect(user.verifiedAt?.toISOString()).toBe(props.verifiedAt.toISOString());
  });
});
