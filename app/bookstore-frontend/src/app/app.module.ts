// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes'; // Import routes
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Import the standalone AppComponent

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes), // Set up routing
    AppComponent, // Import standalone AppComponent
  ],
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes), // Provide router for standalone components
  ]
})
export class AppModule {}
