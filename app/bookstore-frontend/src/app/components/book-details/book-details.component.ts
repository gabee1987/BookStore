import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatCard } from '@angular/material/card';
import { NgIf, NgOptimizedImage } from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  imports: [MatCard, NgIf, NgOptimizedImage, MatButton, RouterLink],
  standalone: true,
})
export class BookDetailsComponent implements OnInit {
  book?: Book;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadBook(id);
    } else {
      console.error('Invalid Book ID');
    }
  }

  private loadBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (err) => {
        console.error('Failed to load book:', err);
      },
    });
  }
}
