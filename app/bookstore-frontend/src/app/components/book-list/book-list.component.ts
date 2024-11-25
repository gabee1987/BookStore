import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AddBookComponent } from '../add-book/add-book.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditBookComponent} from '../edit-book/edit-book.component';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [CommonModule, MatTableModule, RouterModule, MatButton, MatIcon, MatIconButton, MatTooltip, MatDialogModule, NgOptimizedImage],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  openAddBookModal(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '800px', // Modal size
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh book list after adding a book
        this.loadBooks();
      }
    })
  }

  editBookModal( bookId: number ): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '1200px',
      data: bookId,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Opening edit modal for bookId:', bookId);
      if (result) {
        // Refresh book list after editing a book
        this.loadBooks();
      }
    })
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.toastrService.addNotification({
          type: 'success',
          message: 'Book deleted successfully!',
        });
        this.loadBooks();
      },
      error: () => {
        this.toastrService.addNotification({
          type: 'error',
          message: 'Failed to delete the book. Please try again.',
        });
      },
    });
  }
}
