import { Responsable, Task } from '../models/index';

export const responsables: Responsable[] = [
  new Responsable({
    name: 'Michaell Alavedra',
    hoursUnavailablePerDay: [
      { startHour: 1, endHour: 6 },
      { startHour: 9, endHour: 14 },
      { startHour: 15, endHour: 17 },
      { startHour: 23, endHour: 24 },
    ]
  }),
  new Responsable({
    name: 'Paola Velasquez',
    hoursUnavailablePerDay: [
      { startHour: 1, endHour: 6 },
      { startHour: 11, endHour: 14 },
      { startHour: 15, endHour: 20 },
      { startHour: 23, endHour: 24 },
    ]
  }),
];

export const tasks: Task[] = [
  new Task({ name: 'Lavar los platos', estimatedHours: 1, once: 'day', }),
  new Task({ name: 'Barrer y trapear', estimatedHours: 1, once: 'day', }),
  new Task({ name: 'Limpiar el baño', estimatedHours: 1, once: 'week', }),
  new Task({ name: 'Lavar la ropa', estimatedHours: 1, once: 'week', }),
  new Task({ name: 'Limpiar muebles', estimatedHours: 1, once: 'week', }),
  new Task({ name: 'Sacar la basura', estimatedHours: 1, once: 'week', }),
  new Task({ name: 'Cambiar las colchas', estimatedHours: 1, once: 'week', }),
];