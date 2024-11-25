// src/app/shared/services/toastr.service.ts
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrConfig, DEFAULT_TOASTR_CONFIG } from '../shared/toastr/toastr.config';

export interface ToastrMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private notificationsSubject = new BehaviorSubject<ToastrMessage[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(@Inject(DEFAULT_TOASTR_CONFIG) private config: ToastrConfig) {}

  addNotification(message: Omit<ToastrMessage, 'id'>): void {
    const id = this.generateId();
    const timeout = message.timeout ?? this.config.timeout;

    const notification: ToastrMessage = { ...message, id };
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);

    setTimeout(() => this.removeNotification(id), timeout);
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next(
      currentNotifications.filter((notif) => notif.id !== id)
    );
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 11);
  }
}
