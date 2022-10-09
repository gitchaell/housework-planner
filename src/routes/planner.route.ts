/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Router } from 'express';
// types
import { App } from '../types/global.type';

const app = global as App;

export const plannerRoutes =
  Router()
    .get('/planner', async (_, res) => {
      res.send(await app.planner.execute());
      res.end();
    });