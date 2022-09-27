import { Logger } from 'pino';
import { HouseworkPlanner, WhatsappService } from '../services';

export type App = typeof globalThis & {
  authenticated: boolean;
  logger: Logger;
  whatsapp: WhatsappService;
  planner: HouseworkPlanner;
};