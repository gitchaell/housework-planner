import express from 'express';
import cron from 'node-cron';
// types
import { App } from './types/global.type';
// routes
import { authRoutes, plannerRoutes } from './routes';
// services
import { HouseworkPlanner, LogService, WhatsappService } from './services';

(() => {

  const app = global as App;

  app.authenticated = false;
  app.logger = LogService;
  app.whatsapp = new WhatsappService();
  app.planner = new HouseworkPlanner();

  cron.schedule('0 0 0 * * monday', () => {
    app.planner.execute();
  });

  const server = express();

  server.use(authRoutes);
  server.use(plannerRoutes);

  server.listen(3000, () => {
    app.logger.info('Server Running Live on http://localhost:3000');
  });

})();