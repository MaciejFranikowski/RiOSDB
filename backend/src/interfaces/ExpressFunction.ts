import express from 'express';

export type ExpressFunction = (
  req: express.Request,
  res: express.Response) => Promise<express.Response | undefined>;
