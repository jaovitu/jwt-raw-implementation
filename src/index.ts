import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = 'secretKey' // just for test purpose

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000),
  data: {
    sub: '@userID',
  },
  secret
});

console.log({ token });

const decoded = verify({ token, secret });

console.log(decoded);
