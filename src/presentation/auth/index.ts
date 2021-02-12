import jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

export const authConfig = () => ({
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

export const checkJwt = () =>
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig().domain}/.well-known/jwks.json`,
    }),

    audience: `${authConfig().audience}`,
    issuer: `https://${authConfig().domain}/`,
    algorithm: ["RS256"],
  });
