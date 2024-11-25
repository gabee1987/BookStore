// src/app/shared/components/toastr/toastr.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrMessage } from '../../services/toastr.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatCardContent,
    MatCardTitle,
  ],
  standalone: true,
})
export class ToastrComponent implements OnInit {
  notifications$!: Observable<ToastrMessage[]>;

  constructor(private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.notifications$ = this.toastrService.notifications$;
  }

  removeNotification(id: string): void {
    this.toastrService.removeNotification(id);
  }
}
