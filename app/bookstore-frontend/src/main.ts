import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import {appRoutes} from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DEFAULT_TOASTR_CONFIG, ToastrConfig } from './app/shared/toastr/toastr.config';

const toastrDefaultConfig: ToastrConfig = {
  timeout: 3000,
  position: 'top-right',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(), // Replaces HttpClientModule
    provideAnimations(),
    { provide: DEFAULT_TOASTR_CONFIG, useValue: toastrDefaultConfig }, // Provide the default config for toastr
  ],
}).catch((err) => console.error(err));
