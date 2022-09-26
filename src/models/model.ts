/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import { createEvents, EventAttributes } from 'ics';

import { random } from "../shared/utils/random.util";
import { slug } from '../shared/utils/slug.util';

export class WeekMap {

  private map: Record<number, Task[]>

  constructor() {
    this.map = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  }

  addTask(weekday: number, task: Task) {
    this.map[weekday].push(task);
  }

  sort() {
    for (let weekday = 1; weekday <= 7; weekday++) {
      this.map[weekday] = this.map[weekday].sort((aTask, bTask) => aTask.startHour! - bTask.startHour!);
    }
  }

  get() {
    this.sort();
    return this.map;
  }

  print(responsables: Responsable[]) {

    for (const { fullname } of responsables) {

      console.log(fullname);

      const weekTable = [];

      for (let hour = 1; hour <= 24; hour++) {

        const row: Record<number, string | null> = {};

        for (let weekday = 1; weekday <= 7; weekday++) {

          const task = this.map[weekday].find(t => t.startHour! <= hour && hour <= t.endHour! && t.responsable?.fullname == fullname);

          row[weekday] = task?.name ?? '*';
        }

        weekTable.push(row);
      }

      console.table(weekTable);
    }
  }

  generateICSFiles(responsables: Responsable[]) {

    // const date = new Date(Date.now());
    const date = new Date(2022, 8, 26, 0, 0, 0, 0);
    const dateIso = slug(date.toDateString());
    const filepaths: Record<string, string> = {};

    const toDateArray = (date: Date) => {

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();

      return [year, month, day, hour];
    };

    for (const { fullname } of responsables) {

      const events: EventAttributes[] = [];

      for (let weekday = 1; weekday <= 7; weekday++) {

        for (let hour = 1; hour <= 24; hour++) {

          const task = this.map[weekday].find(t => t.startHour! <= hour && hour <= t.endHour! && t.responsable?.fullname == fullname);

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

      const filedir = `./output/${dateIso}`;
      const filepath = `${filedir}/${slug(fullname!)}.houseworks.ics`;
      filepaths[slug(fullname!)] = filepath;

      fs.mkdirSync(filedir, { recursive: true });
      fs.writeFileSync(filepath, value!);

    }

    return filepaths;
  }
}



export class Responsable {
  fullname?: string;
  phone?: string;
  lockedHours?: HourRange[];
  taskHours: HourRange[][];

  constructor({ fullname, phone, lockedHours }: Partial<Responsable>) {
    this.fullname = fullname;
    this.phone = phone;
    this.lockedHours = lockedHours;
    this.taskHours = Array.from({ length: 7 }).fill([]) as HourRange[][];
  }

  addTaskHours(weekday: number, taskHours: HourRange) {
    this.taskHours[weekday - 1].push(taskHours);
  }

  isAvailableIn({ startHour, endHour }: HourRange) {

    if (
      startHour! > 0 && endHour! > 0 &&
      startHour! < 25 && endHour! < 25
    ) {

      const inSomeLockedHourRange = this.lockedHours?.some(range => range.startHour! <= startHour! && endHour! <= range.endHour!);
      const inSomeTaskHourRange = this.taskHours?.some(taskHour => taskHour.some(range => range.startHour! <= startHour! && endHour! <= range.endHour!));

      return !(inSomeLockedHourRange || inSomeTaskHourRange);
    }

    return false;
  }
}


export class Task {
  name?: string;
  estimatedHours?: number;
  once?: 'day' | 'week' = 'day';
  responsable?: Responsable;
  startHour?: number;
  endHour?: number;

  constructor(task: Partial<Task>) {
    this.name = task.name;
    this.estimatedHours = task.estimatedHours;
    this.once = task.once;
    this.responsable = task.responsable;
  }

  get duration() {
    return this.estimatedHours === 1 ? 0 : (this.estimatedHours! - 1);
  }

  getHours(): HourRange | undefined {

    let startHour = random(1, 24);
    let endHour = startHour + this.duration!;
    let loops = 0;

    while (!this.responsable?.isAvailableIn({ startHour, endHour })) {
      startHour = random(1, 24);
      endHour = startHour + this.duration!;
      loops++;
      if (loops > 1000) return undefined;
    }

    return { startHour, endHour };
  }

}


export interface HourRange {
  startHour?: number;
  endHour?: number;
}