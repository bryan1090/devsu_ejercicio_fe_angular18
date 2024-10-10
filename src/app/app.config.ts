/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideRouter(routeConfig),
    
  ]
}; 
