/* eslint-disable @typescript-eslint/no-non-null-assertion */
// interfaces
import { HourRange } from '../interfaces';
// models
import { Responsable } from './responsable.model';
// utils
import { random } from '../utils';


export class Task {
  name?: string;
  estimatedHours?: number;
  once?: 'day' | 'week' = 'day';
  responsable?: Responsable;
  hourRange?: HourRange;

  constructor(task: Partial<Task>) {
    this.name = task.name;
    this.estimatedHours = task.estimatedHours;
    this.once = task.once;
  }

  assignResponsable(responsable: Responsable) {
    this.responsable = responsable;
  }

  assignHourRange(weekday: number) {

    const lapse = HourRange.lapse(this.estimatedHours!);

    let startHour = random(1, 24);
    let endHour = startHour + lapse;
    let loops = 0;

    while (!this.responsable?.isAvailableBetween(weekday, { startHour, endHour } as HourRange)) {
      startHour = random(1, 24);
      endHour = startHour + lapse;
      loops++;

      if (loops > 1000) return;

    }

    this.hourRange = new HourRange({ startHour, endHour });
  }

}
