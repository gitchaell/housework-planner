import pino from 'pino';
import pretty from 'pino-pretty';

export const LogService = pino(pretty());