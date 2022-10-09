/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MessageMedia } from 'whatsapp-web.js';
// assets
import { style } from '../assets/weekmap-table.css';
// types
import { App } from '../types/global.type';
// repositories
import { responsableRepository, taskRepository } from '../repositories';
// utils
import { random, range } from '../utils';


const app = global as App;

export class HouseworkPlanner {

  async execute() {

    responsableRepository.init();
    taskRepository.init();

    this.buildWeekMap();
    await this.writeMediaFiles();
    this.sendMediaFiles();

    return this.getWeeklyMapsHTML();
  }

  private buildWeekMap() {

    for (const weekday of range(1, 7)) {

      taskRepository.getAll({ once: 'day' })
        .forEach(task => {

          responsableRepository
            .getOne({ mode: 'random' })!
            .weeklyMap.addTask(weekday, task);
        })
    }

    let weektask = taskRepository.getOne({ mode: 'random', once: 'week' });

    while (weektask) {

      const weekday = random(1, 7);

      taskRepository.cache.addTask(weektask);

      responsableRepository.getOne({ mode: 'random' })!
        .weeklyMap.addTask(weekday, weektask);

      weektask = taskRepository.getOne({ mode: 'random', once: 'week' });
    }

    app.logger.info(`Weekly Maps have been generated`);
  }

  private getWeeklyMapsHTML() {

    const tables = responsableRepository.getAll()
      .map(responsable => responsable.weeklyMap.toHTML());

    return `
      <html>
        <head>
          <title>Weekly Maps</title>
          <style>${style}</style>
        </head>
        <body>
          <div class="container">${tables.join('')}</div>
        </body>
      </html>`;
  }

  private async writeMediaFiles() {

    const responsables = responsableRepository.getAll();

    for (const responsable of responsables) {
      responsable.weeklyMap.toICS();
      await responsable.weeklyMap.toImage();
    }

    app.logger.info(`ICS and PNG files have been generated and exported.`);
  }

  private sendMediaFiles() {

    if (!app.authenticated) {
      app.logger.error(`There is no whatsapp session available for sending messages.`);
      return;
    }

    const responsables = responsableRepository.getAll();

    for (const responsable of responsables) {

      for (const mediapath of responsable.weeklyMap.mediapaths) {

        const media = MessageMedia.fromFilePath(mediapath);

        app.whatsapp.client.sendMessage(`${responsable.phone}@c.us`, media).then(() => {
          app.logger.info(`File ${mediapath} successfully sent to ${responsable.name}`);
        });
      }
    }
  }

}