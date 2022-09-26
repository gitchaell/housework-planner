import { Logger } from 'pino';
import { WhatsappService } from '../shared/services/whatsapp.service'
import { HouseworkPlanner } from '../shared/services/housework-planner.service';

export type App = typeof globalThis & {
  authenticated: boolean;
  logger: Logger;
  whatsapp: WhatsappService;
  planner: HouseworkPlanner;
};