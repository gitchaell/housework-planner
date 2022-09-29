/* eslint-disable @typescript-eslint/no-non-null-assertion */
// data
import { tasks } from '../database/database';
// models
import { Once, Task } from '../models';
// utils
import { randomFromList } from '../utils';


interface TaskSearchParameter {
  mode: 'random' | 'search';
  name?: string;
  once?: Once;
}

class TaskRepository {

  private tasks: Task[] = [];
  cache: TaskCache = new TaskCache();

  init() {
    this.tasks = tasks();
    this.cache = new TaskCache();
  }

  getOne({ name, once, mode }: TaskSearchParameter): Task | undefined {

    if (mode === 'random') {
      return randomFromList(this.tasks.filter(task => task.once === once && !this.cache.exists(task)));
    }

    if (mode === 'search') {

      if (name)
        return this.tasks.find(task => task.name === name);
    }

  }

  getAll({ once }: { once: Once }) {
    return this.tasks.filter(task => task.once === once);
  }

}

class TaskCache {

  private cache: Record<string, boolean>;

  constructor() {
    this.cache = {};
  }

  addTask(task: Task) {
    this.cache[task.name] = true;
  }

  exists(task: Task) {
    return this.cache[task.name];
  }

  clean() {
    this.cache = {};
  }
}

export const taskRepository = new TaskRepository();