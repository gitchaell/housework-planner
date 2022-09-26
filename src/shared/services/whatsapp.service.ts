import fs from 'fs';
import * as Whatsapp from 'whatsapp-web.js';
// types
import { App } from '../../types/global.type';

const app = global as App;

export class WhatsappService {

  client: Whatsapp.Client;

  constructor() {


    this.client = new Whatsapp.Client({
      authStrategy: new Whatsapp.LocalAuth()
    });

    this.client
      .on('qr', (qr: string) => fs.writeFileSync('./code.qr', qr))
      .on('authenticated', () => {
        app.authenticated = true;
        app.logger.info('Whatsapp Client authenticated')
      })
      .on('auth_failure', () => {
        app.authenticated = false;
        app.logger.info('Whatsapp Client authentication failed')
      })
      .on('ready', () => app.logger.info('Whatsapp Client is Ready'));

    this.client.initialize()
      .then(() => app.logger.info('Whatsapp Client initialized'));
  }

}
