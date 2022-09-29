/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MessageMedia } from 'whatsapp-web.js';
// types
import { App } from '../types/global.type';
// repositories
import { responsableRepository, taskRepository } from '../repositories';
// utils
import { range } from '../utils';


const app = global as App;

export class HouseworkPlanner {

  icspaths: string[] = [];

  execute() {

    responsableRepository.init();
    taskRepository.init();

    this.buildWeekMap();
    this.drawWeeklyMaps();
    // this.sendICSFiles();

  }

  private buildWeekMap() {

    for (const weekday of range(1, 7)) {

      const daytasks = taskRepository.getAll({ once: 'day' });
      const weektask = taskRepository.getOne({ once: 'week', mode: 'random' });

      const tasks = [...daytasks, weektask].filter(Boolean);

      for (const task of tasks) {

        if (!task) continue;

        if (task.once === 'week')
          taskRepository.cache.addTask(task);

        const responsable = responsableRepository.get({ mode: 'random' })!;

        responsable.weeklyMap.addTask(weekday, task);
      }
    }
  }

  private drawWeeklyMaps() {
    responsableRepository
      .getAll()
      .forEach(responsable => responsable.weeklyMap.drawInTerminal());
  }

  private sendICSFiles() {

    responsableRepository
      .getAll()
      .forEach(responsable => {

        const icspath = responsable.weeklyMap.getICSPath();

        const media = MessageMedia.fromFilePath(icspath);

        app.whatsapp.client.sendMessage(`${responsable.phone}@c.us`, media, { caption: 'ICS' }).then(() => {
          app.logger.info(`ICS File successfully sent to ${responsable.name}`)
        });
      });
  }

}