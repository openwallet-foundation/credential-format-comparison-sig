import { Injectable } from '@angular/core';
import { Format, Resources } from './resources';
import values from '../structure.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getElements(): Resources {
    return values;
  }

  getFormat(key: keyof Resources): Format {
    return this.getElements()[key];
  }

  getStructure(key: keyof Resources): string[] {
    return Object.keys(this.getElements()[key].structure);
  }

  getNames(key: keyof Resources): string[] {
    return Object.keys(this.getFormat(key).values);
  }

  getValues(key: keyof Resources): any {
    return this.getFormat(key).values;
  }
}
