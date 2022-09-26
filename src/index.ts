import express from 'express';
import cron from 'node-cron';
// types
import { App } from './types/global.type';
// routes
import AuthRouter from './routes/auth.route';
import PlannerRouter from './routes/planner.route';
// services
import { LogService } from './shared/services/log.service';
import { WhatsappService } from './shared/services/whatsapp.service';
import { HouseworkPlanner } from './shared/services/housework-planner.service';

(() => {

  const app = global as App;

  app.authenticated = false;
  app.logger = LogService;
  app.whatsapp = new WhatsappService();
  app.planner = new HouseworkPlanner();

  cron.schedule('0 0 0 * * monday', () => {

    app.logger.info('Running every monday');

    if (!app.authenticated) {
      app.logger.error('Whatsapp Client not authenticated. Job finished!');
      return;
    }

    app.planner.generateWeekMap();

  });

  const server = express();

  server.use(AuthRouter);
  server.use(PlannerRouter);

  server.listen(3000, () => {
    app.logger.info('Server Running Live on http://localhost:3000');
  });

})();