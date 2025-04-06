import * as dotenv from 'dotenv';

if (!process.env) throw new Error('process.env is not defined');

dotenv.populate(process.env as unknown as {}, {
  JWT_VERIFY_TOKEN_SECRET: '4z2tqjE4DRVdPJ2A0fCg1a+Xd1eKeUSlqChr1dwRjKZmGbo6k2x0OT8wH6JlHGRWPg/b6G8CTVc21nWqapSEYQ==',
  JWT_VERIFY_TOKEN_EXPIRES_IN: '1d',
  JWT_ACCESS_TOKEN_SECRET: '5X4qjTyZwFNv3s2fnCBp8YmguL/kFsF/BO7EtPgxZy9DKybCZna80RRzzq4DvID2AsWxGgdy5JOcALDQwtBrcw==',
  JWT_ACCESS_TOKEN_EXPIRES_IN: '1h',
  JWT_REFRESH_TOKEN_SECRET: 'JAk0scu3c8YeNqVXA1Kft6QBk2GPpXaexQXyR8pYdkQpe3S++Nd+Kr8oGIfq60hAWPolTGHaPNdGR7rkigScMw==',
  JWT_REFRESH_TOKEN_EXPIRES_IN: '7d',
  APP_URL: 'http://localhost:8080',
});
