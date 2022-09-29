// data
import { responsables } from '../database/database';
// models
import { Responsable } from '../models';
// utils
import { randomFromList } from '../utils';

interface ResponsableSearchParameter {
  mode: 'random' | 'search',
  name?: string,
}

class ResponsableRepository {

  private responsables: Responsable[] = [];

  init() {
    this.responsables = responsables();
  }

  getAll() {
    return this.responsables;
  }

  getOne({ name, mode }: ResponsableSearchParameter) {

    if (mode === 'random') {
      return randomFromList(this.responsables);
    }

    if (mode === 'search') {

      if (name) {
        return this.responsables.find(r => r.name === name);
      }
    }
  }
}

export const responsableRepository = new ResponsableRepository();