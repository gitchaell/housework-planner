/* eslint-disable @typescript-eslint/no-non-null-assertion */
// types
import { App } from '../../types/global.type';
// models
import { MessageMedia } from 'whatsapp-web.js';
import { Responsable, Task, WeekMap } from '../../models/model';
import { random } from '../utils/random.util';
import { slug } from '../utils/slug.util';

const app = global as App;

export class HouseworkPlanner {

  responsables: Responsable[] = [
    new Responsable({
      fullname: 'Michaell Alavedra',
      lockedHours: [
        { startHour: 1, endHour: 6 },
        { startHour: 9, endHour: 13 },
        { startHour: 15, endHour: 17 },
        { startHour: 23, endHour: 24 },
      ]
    }),
    new Responsable({
      fullname: 'Paola Velasquez',
      lockedHours: [
        { startHour: 1, endHour: 6 },
        { startHour: 11, endHour: 13 },
        { startHour: 15, endHour: 20 },
        { startHour: 23, endHour: 24 },
      ]
    }),
  ];

  tasks: Task[] = [
    new Task({ name: 'Lavar los platos', estimatedHours: 1, once: 'day', }),
    new Task({ name: 'Barrer y trapear', estimatedHours: 1, once: 'day', }),
    new Task({ name: 'Limpiar el baño', estimatedHours: 1, once: 'week', }),
    new Task({ name: 'Lavar la ropa', estimatedHours: 1, once: 'week', }),
    new Task({ name: 'Limpiar muebles', estimatedHours: 1, once: 'week', }),
    new Task({ name: 'Sacar la basura', estimatedHours: 1, once: 'week', }),
  ];


  async generateWeekMap() {

    const weekmap: WeekMap = new WeekMap();
    const taskOfWeekCache: Record<string, boolean> = {};

    for (let weekday = 1; weekday <= 7; weekday++) {

      const tasksOfDay = this.tasks.filter(task => task.once === 'day');
      const tasksOfWeek = this.tasks.filter(task => task.once === 'week' &&
        random(1, 2) === 1 && !taskOfWeekCache[task.name!]);

      for (const task of [...tasksOfDay, ...tasksOfWeek]) {

        if (task.once === 'week')
          taskOfWeekCache[task.name!] = true;

        const taskRef = new Task({ ...task });

        const responsable = this.getRandomResponsable();

        taskRef.responsable = responsable;

        const hoursRange = taskRef.getHours();

        if (!hoursRange) continue;

        taskRef.startHour = hoursRange.startHour;
        taskRef.endHour = hoursRange.endHour;

        responsable.addTaskHours(weekday, hoursRange);

        weekmap.addTask(weekday, taskRef);
      }
    }

    // weekmap.print(this.responsables);

    const filepaths = weekmap.generateICSFiles(this.responsables);

    for (const { fullname, phone } of this.responsables) {

      const media = MessageMedia.fromFilePath(filepaths[slug(fullname!)]);

      await app.whatsapp.client.sendMessage(`${phone}@c.us`, media, { caption: 'ICS' });

      app.logger.info(`ICS File successfully sent to ${fullname!}`)
    }

    return weekmap.get();
  }

  getRandomResponsable() {

    const dataset = this.responsables
      .map(responsable => ({ responsable, weight: 1 }))
      .map((data, index) => Array(data.weight).fill(index))
      .reduce((accumulation, data) => accumulation.concat(data), []);

    const index = Math.floor((Math.random() * dataset.length));

    return this.responsables[dataset[index]];
  }
}