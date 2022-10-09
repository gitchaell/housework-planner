/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import { createEvents, EventAttributes } from 'ics';
import nodeHtmlToImage from 'node-html-to-image';
// assets
import { style } from '../assets/weekmap-table.css';
// model
import { DayTime, Task } from './task.model';
// utils
import { hourDisplay, random, range, slug, toDateArray, weekDisplay } from '../utils';

export type DayMap = Record<number, WeeklyItem>;
export type WeekMap = Record<number, DayMap>;

export class WeeklyMap {

  static MAX_TASKS_BY_HOUR = 3;

  private name: string;
  private map: WeekMap;

  private startdate: Date;
  private outputdirpath: string;

  mediapaths: string[] = [];


  static initDaymap({ enabledHours, disabledHours }: { enabledHours: number[], disabledHours: number[] }): DayMap {
    return Object.assign({}, ...[
      ...disabledHours.map(hour => ({ [hour]: new WeeklyItem('disabled') })),
      ...enabledHours.map(hour => ({ [hour]: new WeeklyItem('enabled') })),
    ]);
  }

  constructor(name: string, map: WeekMap) {
    this.name = name;
    this.map = map;
    this.mediapaths = [];
    this.startdate = new Date(2022, 9, 10, 0, 0, 0, 0);// new Date(Date.now());
    this.outputdirpath = `./output/${slug(this.startdate.toDateString())}`;
    fs.mkdirSync(this.outputdirpath, { recursive: true });
  }

  getItem(weekday: number, hour: number) {
    return this.map[weekday][hour];
  }

  addTask(weekday: number, task: Task) {

    let loops = 0;

    let hour = random(1, 24);
    let weeklyItem = this.getItem(weekday, hour);

    while (weeklyItem.state === 'disabled' || !this.hourIsValid(hour, task.daytime)) {

      loops++;

      hour = random(1, 24);
      weeklyItem = this.getItem(weekday, hour);

      if (loops > 1000) return;
    }

    const tasksByHour = weeklyItem.tasks.push(task);

    if (tasksByHour === WeeklyMap.MAX_TASKS_BY_HOUR)
      weeklyItem.state = 'disabled';
  }

  hourIsValid(hour: number, daytime: DayTime) {

    return {
      'anytime': true,
      'morning': 5 <= hour && hour <= 11,
      'afternoon': 13 <= hour && hour <= 18,
      'evening': 19 <= hour && hour <= 23,
    }[daytime];
  }


  toICS(): void {

    const date = new Date(this.startdate);
    const events: EventAttributes[] = [];

    for (const weekday of range(1, 7)) {

      for (const hour of range(1, 24)) {

        const { tasks } = this.getItem(weekday, hour);

        if (!tasks.length) continue;

        const startDate = new Date(date);
        startDate.setHours(hour);

        const endDate = new Date(date);
        endDate.setHours(hour + 1);

        tasks.forEach(task => {

          events.push({
            title: task.name,
            start: toDateArray(startDate),
            end: toDateArray(endDate),
            alarms: [{
              action: 'audio',
              description: 'Reminder',
              trigger: { minutes: 5, before: true },
              repeat: 1,
              attachType: 'VALUE=URI',
              attach: 'Glass'
            }]
          } as EventAttributes);
        });
      }

      date.setDate(date.getDate() + 1);
    }

    const { error, value } = createEvents(events);

    if (error) throw new Error('An error occurred during ICS file generation');

    const icspath = `${this.outputdirpath}/${this.name}.ics`;

    fs.writeFileSync(icspath, value!);

    this.mediapaths.push(icspath);
  }


  toHTML(): string {

    const date = new Date(this.startdate);
    const weekDate = new Date(date);

    const weeklyRowHeader = range(1, 7).map(_ => {
      const weeklyRowCell = weekDisplay(weekDate);
      weekDate.setDate(weekDate.getDate() + 1);
      return `<th>${weeklyRowCell}</th>`;
    });

    const weeklyTable = [
      `<tr><th colspan="8">${this.name}</th></tr>`,
      `<tr><th></th>${weeklyRowHeader.join('')}</tr>`
    ];

    const hourDate = new Date(date);

    range(1, 24).forEach(hour => {

      hourDate.setHours(hourDate.getHours() + 1);

      const hourRowCell = hourDisplay(hourDate);

      const weeklyRowBody = [`<th>${hourRowCell}</th>`];

      range(1, 7).forEach(weekday => {

        const { tasks, state } = this.getItem(weekday, hour);

        const tasksCell = `<div>${tasks.map(task => `<span>${task.name}</span>`).join('')}</div>`;
        const cellClass = state === 'disabled' && tasks.length == 0 ? 'blocked' : ''

        weeklyRowBody.push(`<td class="${cellClass}">${tasksCell}</td>`);
      });

      weeklyTable.push(`<tr>${weeklyRowBody.join('')}</tr>`);
    });

    return `<table>${weeklyTable.join('')}</table>`;
  }


  async toImage(): Promise<void> {

    const imagepath = `${this.outputdirpath}/${this.name}.png`;

    const image = await nodeHtmlToImage({
      html: `<html>
        <head>
          <style>${style}</style>
        </head>
        <body style="width: 890px;">
          ${this.toHTML()}
        </body>
      </html>`,
      puppeteerArgs: { defaultViewport: null },
    });

    if (!image) throw new Error('An error occurred during image generation');

    fs.writeFileSync(imagepath, image as string);

    this.mediapaths.push(imagepath);

  }


  drawInTerminal(): void {

    const weeklyTable = [];

    for (const hour of range(1, 24)) {

      const weeklyRow: Record<number, string> = {};

      for (const weekday of range(1, 7)) {

        const { tasks } = this.getItem(weekday, hour);

        weeklyRow[weekday] = tasks.length
          ? tasks.map(task => task.name).join(' & ')
          : '*';
      }

      weeklyTable.push(weeklyRow);
    }

    console.log(this.name);
    console.table(weeklyTable);
  }
}

export class WeeklyItem {
  tasks: Task[];
  state: WeeklyItemState;

  constructor(state: WeeklyItemState) {
    this.state = state;
    this.tasks = [];
  }
}

export type WeeklyItemState = 'enabled' | 'disabled';