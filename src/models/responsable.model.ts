/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HourRange } from '../interfaces';

export class Responsable {

  name?: string;
  phone?: string;
  hoursUnavailablePerDay?: HourRange[];
  hoursUnavailableByTasks: HourRange[][];

  constructor({ name, phone, hoursUnavailablePerDay }: Partial<Responsable>) {
    this.name = name;
    this.phone = phone;
    this.hoursUnavailablePerDay = hoursUnavailablePerDay;
    this.hoursUnavailableByTasks = Array.from({ length: 7 }).fill([]) as HourRange[][];
  }

  cleanUnavailableHoursByTasks() {
    this.hoursUnavailableByTasks = Array.from({ length: 7 }).fill([]) as HourRange[][];
  }

  addUnavailableHoursRangePerTask(weekday: number, hourRange: HourRange) {
    if (hourRange)
      this.hoursUnavailableByTasks[weekday - 1].push(hourRange);
  }

  isAvailableBetween(weekday: number, { startHour, endHour }: HourRange) {

    if (startHour! > 0 && endHour! > 0 && startHour! < 25 && endHour! < 25) {

      const isBetweenUnavailableHourPerDay = this.hoursUnavailablePerDay
        ?.some(range => range.startHour! <= startHour! && endHour! <= range.endHour!);

      const isBetweenUnavailableHourByTasks = this.hoursUnavailableByTasks[weekday - 1]
        .some(range => range.startHour! <= startHour! && endHour! <= range.endHour!);

      return !(isBetweenUnavailableHourPerDay || isBetweenUnavailableHourByTasks);
    }

    return false;
  }
}