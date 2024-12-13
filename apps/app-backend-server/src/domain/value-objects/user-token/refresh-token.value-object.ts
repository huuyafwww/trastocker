import jwt from 'jsonwebtoken';
import * as v from 'valibot';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';

import type { JwtPayload, VerifyOptions } from 'jsonwebtoken';

export class InvalidUserTokenRefreshTokenError extends Error {
  public constructor(message = 'Invalid UserTokenRefreshToken') {
    super(message);
    this.name = 'InvalidUserTokenRefreshTokenError';
  }
}

export type UserTokenRefreshTokenPayload = {
  userId: UserId;
  email: UserEmail;
};

type UserTokenRefreshTokenDecodedPayload = {
  userId: string;
  email: string;
};

export class UserTokenRefreshToken {
  private readonly value: string;
  private static readonly schema = v.string();

  protected constructor(value: string) {
    this.value = value;
  }

  public static generate(payload: UserTokenRefreshTokenPayload): UserTokenRefreshToken {
    return new this(jwt.sign({
      userId: payload.userId.toString(),
      email: payload.email.toString(),
    }, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    }));
  }

  public static fromString(value: string): UserTokenRefreshToken {
    if (!UserTokenRefreshToken.isValid(value)) {
      throw new InvalidUserTokenRefreshTokenError();
    }
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserTokenRefreshToken.schema, value).success;
  }

  private verify(options?: VerifyOptions): JwtPayload | null {
    try {
      return jwt.verify(this.value, process.env.JWT_REFRESH_TOKEN_SECRET, options) as JwtPayload;
    }
    catch {
      return null;
    }
  }

  public canVerify(options?: VerifyOptions): boolean {
    return !!this.verify(options);
  }

  public toString(): string {
    return this.value;
  }

  public decode(): UserTokenRefreshTokenPayload | null {
    const verifiedJwt = this.verify() as UserTokenRefreshTokenDecodedPayload | null;
    if (!verifiedJwt) return null;
    return {
      userId: UserId.fromString(verifiedJwt['userId']),
      email: UserEmail.fromString(verifiedJwt['email']),
    };
  }

  public isEqual(accessToken: UserTokenRefreshToken): boolean {
    return this.value === accessToken.value;
  }
}
