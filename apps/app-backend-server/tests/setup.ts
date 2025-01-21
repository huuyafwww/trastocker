import * as dotenv from 'dotenv';

if (!process.env) throw new Error('process.env is not defined');

dotenv.populate(process.env as unknown as {}, {
  JWT_ACCESS_TOKEN_SECRET: '5X4qjTyZwFNv3s2fnCBp8YmguL/kFsF/BO7EtPgxZy9DKybCZna80RRzzq4DvID2AsWxGgdy5JOcALDQwtBrcw==',
  JWT_ACCESS_TOKEN_EXPIRES_IN: '1h',
  JWT_REFRESH_TOKEN_SECRET: 'JAk0scu3c8YeNqVXA1Kft6QBk2GPpXaexQXyR8pYdkQpe3S++Nd+Kr8oGIfq60hAWPolTGHaPNdGR7rkigScMw==',
  JWT_REFRESH_TOKEN_EXPIRES_IN: '7d',
});
