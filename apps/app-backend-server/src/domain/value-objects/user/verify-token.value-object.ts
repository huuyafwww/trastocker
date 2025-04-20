import jwt from 'jsonwebtoken';
import * as v from 'valibot';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';

import { ValueObject } from '../core/value-object';

import type { JwtPayload, VerifyOptions } from 'jsonwebtoken';

export class InvalidUserVerifyTokenError extends Error {
  public constructor(message = 'Invalid UserVerifyToken') {
    super(message);
    this.name = 'InvalidUserVerifyTokenError';
  }
}

export type UserVerifyTokenPayload = {
  userId: UserId;
  email: UserEmail;
};

type UserVerifyTokenDecodedPayload = {
  userId: string;
  email: string;
};

export class UserVerifyToken extends ValueObject<string> {
  declare readonly __brand: 'UserVerifyToken';
  private static readonly schema = v.string();

  protected constructor(value: string) {
    super(value);
  }

  public static generate(payload: UserVerifyTokenPayload): UserVerifyToken {
    return new this(jwt.sign({
      userId: payload.userId.toString(),
      email: payload.email.toString(),
    }, process.env.JWT_VERIFY_TOKEN_SECRET, {
      expiresIn: process.env.JWT_VERIFY_TOKEN_EXPIRES_IN,
    }));
  }

  public static fromString(value: string): UserVerifyToken {
    if (!UserVerifyToken.isValid(value)) {
      throw new InvalidUserVerifyTokenError();
    }
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserVerifyToken.schema, value).success;
  }

  private verify(options?: VerifyOptions): JwtPayload | null {
    try {
      return jwt.verify(this.value, process.env.JWT_VERIFY_TOKEN_SECRET, options) as JwtPayload;
    }
    catch {
      return null;
    }
  }

  public canVerify(options?: VerifyOptions): boolean {
    return !!this.verify(options);
  }

  public decode(): UserVerifyTokenPayload | null {
    const verifiedJwt = this.verify() as UserVerifyTokenDecodedPayload | null;
    if (!verifiedJwt) return null;
    return {
      userId: UserId.fromString(verifiedJwt['userId']),
      email: UserEmail.fromString(verifiedJwt['email']),
    };
  }

  public isEqual(accessToken: UserVerifyToken): boolean {
    return this.value === accessToken.value;
  }
}
