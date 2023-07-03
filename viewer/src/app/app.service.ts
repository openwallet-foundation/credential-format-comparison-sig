import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  getProfileNames(): string[] {
    return Object.keys(this.getProfiles());
  }

  getProfiles() {
    return this.getElements()['Credential Profile']['values'];
  }

  getElements() {
    return (window as any)['structure'];
  }
}
