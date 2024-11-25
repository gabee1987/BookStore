import { InjectionToken } from '@angular/core';

export interface ToastrConfig {
  timeout: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const DEFAULT_TOASTR_CONFIG = new InjectionToken<ToastrConfig>('DEFAULT_TOASTR_CONFIG');
