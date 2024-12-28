import jwt from 'jsonwebtoken';
import * as v from 'valibot';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';

import { ValueObject } from '../core/value-object';

import type { JwtPayload, VerifyOptions } from 'jsonwebtoken';

export class InvalidUserTokenAccessTokenError extends Error {
  public constructor(message = 'Invalid UserTokenAccessToken') {
    super(message);
    this.name = 'InvalidUserTokenAccessTokenError';
  }
}

export type UserTokenAccessTokenPayload = {
  userId: UserId;
  email: UserEmail;
};

type UserTokenAccessTokenDecodedPayload = {
  userId: string;
  email: string;
};

export class UserTokenAccessToken extends ValueObject<string> {
  private static readonly schema = v.string();

  protected constructor(value: string) {
    super(value);
  }

  public static generate(payload: UserTokenAccessTokenPayload): UserTokenAccessToken {
    return new this(jwt.sign({
      userId: payload.userId.toString(),
      email: payload.email.toString(),
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    }));
  }

  public static fromString(value: string): UserTokenAccessToken {
    if (!UserTokenAccessToken.isValid(value)) {
      throw new InvalidUserTokenAccessTokenError();
    }
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserTokenAccessToken.schema, value).success;
  }

  private verify(options?: VerifyOptions): JwtPayload | null {
    try {
      return jwt.verify(this.value, process.env.JWT_ACCESS_TOKEN_SECRET, options) as JwtPayload;
    }
    catch {
      return null;
    }
  }

  public canVerify(options?: VerifyOptions): boolean {
    return !!this.verify(options);
  }

  public decode(): UserTokenAccessTokenPayload | null {
    const verifiedJwt = this.verify() as UserTokenAccessTokenDecodedPayload | null;
    if (!verifiedJwt) return null;
    return {
      userId: UserId.fromString(verifiedJwt['userId']),
      email: UserEmail.fromString(verifiedJwt['email']),
    };
  }

  public isEqual(accessToken: UserTokenAccessToken): boolean {
    return this.value === accessToken.value;
  }
}
