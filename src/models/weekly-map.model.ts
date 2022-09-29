/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import { createEvents, EventAttributes } from 'ics';
// model
import { DayTime, Task } from './task.model';
// utils
import { random, range, slug, toDateArray } from '../utils';


export class WeeklyMap {

  private name: string;
  private map: Record<number, WeeklyItem[]>;

  constructor(name: string, map: Record<number, WeeklyItem[]>) {
    this.name = name;
    this.map = map;
  }

  addTask(weekday: number, task: Task) {

    let hour = random(1, 24);
    let loops = 0;

    while (!(this.map[weekday][hour - 1].state === 'enabled' && this.hourIsValid(hour, task.daytime))) {
      hour = random(1, 24);
      loops++;

      if (loops > 1000) return;

    }

    this.map[weekday][hour - 1].task = task;
    this.map[weekday][hour - 1].state = 'disabled';
  }

  hourIsValid(hour: number, daytime: DayTime) {

    return {
      'anytime': true,
      'morning': 5 <= hour && hour <= 11,
      'afternoon': 13 <= hour && hour <= 18,
      'evening': 19 <= hour && hour <= 23,
    }[daytime];
  }

  getICSPath(): string {

    // const date = new Date(Date.now());
    const date = new Date(2022, 8, 26, 0, 0, 0, 0);
    const dirname = slug(date.toDateString());

    const events: EventAttributes[] = [];

    for (const weekday of range(1, 7)) {

      for (const hour of range(1, 24)) {

        const { task } = this.map[weekday][hour - 1];

        if (!task) continue;

        const startDate = date;
        startDate.setHours(hour);

        const endDate = date;
        endDate.setHours(hour + 1);

        events.push({
          title: task.name!,
          start: toDateArray(startDate),
          end: toDateArray(endDate),
        } as EventAttributes);
      }

      date.setDate(date.getDate() + 1);
    }

    const { error, value } = createEvents(events);

    if (error) throw error;

    const dirpath = `./output/${dirname}`;
    const icspath = `${dirpath}/${this.name}.ics`;

    fs.mkdirSync(dirpath, { recursive: true });
    fs.writeFileSync(icspath, value!);

    return icspath;
  }


  drawInTerminal(): void {

    const weeklyTable = [];

    for (const hour of range(1, 24)) {

      const weekrow: Record<number, string> = {};

      for (const weekday of range(1, 7)) {

        const item = this.map[weekday][hour - 1];

        weekrow[weekday] = item.task ? item.task.name : '*';
        // row[weekday] = item.state;
      }

      weeklyTable.push(weekrow);
    }

    console.table(weeklyTable);
  }
}

export class WeeklyItem {
  task?: Task;
  state: WeeklyItemState;

  constructor({ task, state }: WeeklyItem) {
    this.task = task;
    this.state = state;
  }
}

export type WeeklyItemState = 'enabled' | 'disabled';