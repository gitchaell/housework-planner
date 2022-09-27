/* eslint-disable @typescript-eslint/no-non-null-assertion */
// model
import { Responsable } from './responsable.model';
import { Task } from './task.model';

export class WeekMap {

  private map: Record<number, Task[]>

  constructor() {
    this.map = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  }

  addTask(weekday: number, task: Task) {
    this.map[weekday].push(task);
  }

  getTask({ weekday, hour, responsable }: { weekday: number, hour: number, responsable: Responsable }) {

    return this.map[weekday].find(task =>
      task.hourRange &&
      task.hourRange.startHour <= hour && hour <= task.hourRange.endHour &&
      task.responsable!.name == responsable.name);
  }

  get() {
    return this.map;
  }
}