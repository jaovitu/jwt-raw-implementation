import { createHmac } from 'node:crypto';

interface ISignOption {
  data: Record<string, any>
  exp: number;
  secret: string;
}

export function sign(options: ISignOption) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    ...options.data,
    iat: Date.now(),
    exp: options.exp
  }

  const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url');

  const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');

  const hmac = createHmac('sha256', options.secret);

  const signature = hmac
    .update(`${base64EncodedHeader}.${base64EncodedPayload}`)
    .digest('base64url');

  const token = `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;

  return token;
}
