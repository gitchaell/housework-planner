export class HourRange {
  startHour: number;
  endHour: number;

  constructor({ startHour, endHour }: Required<HourRange>) {
    this.startHour = startHour;
    this.endHour = endHour;
  }

  static lapse(estimatedHours: number) {
    return estimatedHours === 1 ? 0 : (estimatedHours - 1);
  }
}