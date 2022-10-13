import express from 'express';
import jwt from 'jsonwebtoken';
import type { ExpressFunction } from '../interfaces/ExpressFunction';

const JWT_HEADER_KEY = 'Authentication';
let JWT_SECRET_KEY: string;
if (process.env.JWT_SECRET_KEY) {
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
} else throw Error('JWT Secret key could not be retrieved!');

export const checkToken = (req: express.Request): boolean => {
  const token = req.header(JWT_HEADER_KEY);
  return !!(token && jwt.verify(token, JWT_SECRET_KEY));
};

export const WithAuthentication = (
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<ExpressFunction>,
) => {
  const method = descriptor.value;
  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function checkAuthorization(
    ...args: [req: express.Request, res: express.Response]
  ) {
    const [req, res] = args;
    return checkToken(req) ? method?.apply(this, [req, res]) : res.status(401).json('Authentication required!');
  };
};
