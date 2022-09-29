/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
// models
import { Responsable, Task, WeeklyMap } from '../models/index';
// utils
import { range } from '../utils';

export const responsables = (): Responsable[] => [
  new Responsable({
    name: 'Michaell Alavedra',
    phone: process.env.PHONE_1!,
    weeklyMap: new WeeklyMap('michaell.weeklymap', {
      1: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 9), 14, ...range(19, 22)],
        disabledHours: [...range(1, 7), ...range(10, 13), ...range(15, 18), ...range(23, 24)],
      }),
      2: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 9), 14, ...range(19, 22)],
        disabledHours: [...range(1, 7), ...range(10, 13), ...range(15, 18), ...range(23, 24)],
      }),
      3: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 9), 14, ...range(19, 22)],
        disabledHours: [...range(1, 7), ...range(10, 13), ...range(15, 18), ...range(23, 24)],
      }),
      4: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 9), 14, ...range(19, 22)],
        disabledHours: [...range(1, 7), ...range(10, 13), ...range(15, 18), ...range(23, 24)],
      }),
      5: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 9), 14, ...range(19, 22)],
        disabledHours: [...range(1, 7), ...range(10, 13), ...range(15, 18), ...range(23, 24)],
      }),
      6: WeeklyMap.initDaymap({
        enabledHours: [...range(10, 12), ...range(20, 22)],
        disabledHours: [...range(1, 9), ...range(13, 19), ...range(23, 24)],
      }),
      7: WeeklyMap.initDaymap({
        enabledHours: [...range(10, 12), ...range(20, 22)],
        disabledHours: [...range(1, 9), ...range(13, 19), ...range(23, 24)],
      }),
    })
  }),
  new Responsable({
    name: 'Paola Velasquez',
    phone: process.env.PHONE_2!,
    weeklyMap: new WeeklyMap('paola.weeklymap', {
      1: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 10), 14, ...range(20, 22)],
        disabledHours: [...range(1, 7), ...range(11, 13), ...range(15, 19), ...range(23, 24)],
      }),
      2: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 10), 14, ...range(20, 22)],
        disabledHours: [...range(1, 7), ...range(11, 13), ...range(15, 19), ...range(23, 24)],
      }),
      3: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 10), 14, ...range(20, 22)],
        disabledHours: [...range(1, 7), ...range(11, 13), ...range(15, 19), ...range(23, 24)],
      }),
      4: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 10), 14, ...range(20, 22)],
        disabledHours: [...range(1, 7), ...range(11, 13), ...range(15, 19), ...range(23, 24)],
      }),
      5: WeeklyMap.initDaymap({
        enabledHours: [...range(8, 10), 14, ...range(20, 22)],
        disabledHours: [...range(1, 7), ...range(11, 13), ...range(15, 19), ...range(23, 24)],
      }),
      6: WeeklyMap.initDaymap({
        enabledHours: [...range(10, 12), ...range(20, 22)],
        disabledHours: [...range(1, 9), ...range(13, 19), ...range(23, 24)],
      }),
      7: WeeklyMap.initDaymap({
        enabledHours: [...range(10, 12), ...range(20, 22)],
        disabledHours: [...range(1, 9), ...range(13, 19), ...range(23, 24)],
      }),
    })
  }),
];

export const tasks = (): Task[] => [
  // Per Day
  new Task({ name: 'Lavar platos', once: 'day', daytime: 'anytime' }),
  new Task({ name: 'Barrer', once: 'day', daytime: 'anytime' }),
  new Task({ name: 'Preparar desayuno', once: 'day', daytime: 'morning' }),
  new Task({ name: 'Preparar cena', once: 'day', daytime: 'evening' }),
  // Per Week
  new Task({ name: 'Trapear', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar baño', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Lavar ropa', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar muebles', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Sacar la basura', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Lavar sabanas', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar hornillas', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar refrigeradora', once: 'week', daytime: 'anytime' }),
  new Task({ name: 'Limpiar jaula de pajaros', once: 'week', daytime: 'anytime' }),
];