import { createHmac } from 'node:crypto';

interface IGenerateSignature {
  header: string;
  payload: string;
  secret: string;
}

export function generateSignature(options: IGenerateSignature) {
  const hmac = createHmac('sha256', options.secret);

  const signature = hmac
    .update(`${options.header}.${options.payload}`)
    .digest('base64url');

  return signature;
}
