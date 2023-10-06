import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment/environment';
import { EnvironmentConfig } from 'src/app/models/core/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor() { }

  get(): EnvironmentConfig {
    if (typeof environment === 'undefined') {
      return new EnvironmentConfig();
    }
    return environment;
  }
}
