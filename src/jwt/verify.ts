import { generateSignature } from './generate-signature';

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify(options: IVerifyOptions) {
  const [ sentHeader, sentPayload, sentSignature ] = options.token.split('.');

  const signature = generateSignature({
    header: sentHeader,
    payload: sentPayload,
    secret: options.secret
  });

  if (signature !== sentSignature) {
    throw new Error('Invalid JWT token.');
  }

  const decodedPayload = JSON.parse(Buffer.from(sentPayload, 'base64url').toString('utf-8'));

  if (Date.now() > decodedPayload.exp) {
    throw new Error('Expired JWT token.');
  }

  return decodedPayload;
}
