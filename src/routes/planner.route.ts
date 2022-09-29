/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Router } from 'express';
// types
import { App } from '../types/global.type';

const app = global as App;

export const plannerRoutes =
  Router()
    .get('/planner', (_, res) => {

      app.planner.execute();

      res.send('executed');
      res.end();
    });