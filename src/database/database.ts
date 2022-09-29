/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
// models
import { Responsable, Task, WeeklyItem, WeeklyMap } from '../models/index';
// utils
import { range } from '../utils';

export const responsables = (): Responsable[] => [
  new Responsable({
    name: 'Michaell Alavedra',
    phone: process.env.PHONE_1!,
    weeklyMap: new WeeklyMap('michaell.weeklymap', {
      1: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 9).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(10, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 18).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(19, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      2: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 9).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(10, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 18).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(19, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      3: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 9).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(10, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 18).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(19, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      4: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 9).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(10, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 18).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(19, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      5: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 9).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(10, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 18).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(19, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      6: [
        ...range(1, 9).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(10, 12).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(13, 14).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(15, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      7: [
        ...range(1, 9).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(10, 12).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(13, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
    })
  }),
  new Responsable({
    name: 'Paola Velasquez',
    phone: process.env.PHONE_2!,
    weeklyMap: new WeeklyMap('paola.weeklymap', {
      1: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 10).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(11, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      2: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 10).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(11, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      3: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 10).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(11, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      4: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 10).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(11, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      5: [
        ...range(1, 7).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(8, 10).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(11, 13).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(14, 15).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(15, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      6: [
        ...range(1, 9).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(10, 12).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(13, 14).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(15, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
      7: [
        ...range(1, 9).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(10, 12).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(13, 19).map(_ => new WeeklyItem({ state: 'disabled' })),
        ...range(20, 22).map(_ => new WeeklyItem({ state: 'enabled' })),
        ...range(23, 24).map(_ => new WeeklyItem({ state: 'disabled' })),
      ],
    })
  }),
];

export const tasks = (): Task[] => [
  // Per Day
  new Task({ name: 'Lavar los platos', once: 'day', daytime: 'anytime' }),
  new Task({ name: 'Barrer y trapear', once: 'day', daytime: 'anytime' }),
  new Task({ name: 'Preparar el desayuno', once: 'day', daytime: 'morning' }),
  new Task({ name: 'Preparar la cena', once: 'day', daytime: 'evening' }),
  // Per Week
  new Task({ name: 'Limpiar el baño', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Lavar la ropa', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar los muebles', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Sacar la basura', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Lavar y cambiar sabanas y colchas', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar las hornillas', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar la refrigeradora', once: 'week', daytime: 'anytime' }),
];