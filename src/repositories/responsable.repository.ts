// data
import { responsables } from '../database/database';
// models
import { Responsable } from '../models';
import { randomFromList } from '../utils';


class ResponsableRepository {

  private responsables: Responsable[] = [];

  constructor() {
    this.responsables = responsables;
  }

  getAll() {
    return this.responsables;
  }

  get({ name, mode }: { name?: string, mode: 'random' | 'search' }) {

    if (mode === 'random') {
      return randomFromList(this.responsables);
    }

    if (mode === 'search') {

      if (name) {
        return this.responsables.find(r => r.name === name);
      }
    }
  }

  cleanAllUnavailableHoursByTasks() {
    this.responsables.forEach(r => r.cleanUnavailableHoursByTasks());
  }
}

export const responsableRepository = new ResponsableRepository();