/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WeeklyMap } from './weekly-map.model';

export class Responsable {

  name: string;
  phone: string;
  weeklyMap: WeeklyMap;

  constructor(responsable: Responsable) {
    this.name = responsable.name;
    this.phone = responsable.phone;
    this.weeklyMap = responsable.weeklyMap;
  }
}