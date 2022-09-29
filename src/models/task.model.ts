export type DayTime = 'morning' | 'afternoon' | 'evening' | 'anytime';
export type Once = 'day' | 'week';

export class Task {
  name: string;
  once: Once = 'day';
  daytime: DayTime = 'anytime';

  constructor(task: Task) {
    this.name = task.name;
    this.once = task.once;
    this.daytime = task.daytime;
  }
}
