/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Router } from 'express';
// types
import { App } from '../types/global.type';

const app = global as App;

const PlannerRouter = Router();

PlannerRouter.get('/planner', async (_, res) => {

  const weekmap = await app.planner.generateWeekMap();

  res.json(weekmap);
  res.end();
});

export default PlannerRouter;