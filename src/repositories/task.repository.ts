/* eslint-disable @typescript-eslint/no-non-null-assertion */
// data
import { tasks } from '../database/database';
// models
import { Task } from '../models';
// utils
import { random } from '../utils';


class TaskRepository {

  private tasks: Task[] = [];
  private tasksByWeekCache: Record<string, boolean> = {};

  constructor() {
    this.tasks = tasks;
  }

  get({ name }: { name: string }) {

    if (name) {
      return this.tasks.find(r => r.name === name);
    }
  }

  getAll({ once }: { once: 'day' | 'week' }) {

    if (once === 'day')
      return this.tasks.filter(task => task.once === 'day');

    if (once === 'week')
      return this.tasks.filter(task => task.once === 'week' && random(1, 2) === 1 && !this.tasksByWeekCache[task.name!]);
  }

  addInCache(task: Task) {
    this.tasksByWeekCache[task.name!] = true;
  }

  cleanTaskByWeekCache() {
    this.tasksByWeekCache = {};
  }
}

export const taskRepository = new TaskRepository();