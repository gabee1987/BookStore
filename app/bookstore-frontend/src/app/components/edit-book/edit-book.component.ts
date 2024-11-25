import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInput, MatButton, MatProgressSpinner, NgIf, NgOptimizedImage],
  standalone: true,
})
export class EditBookComponent implements OnInit {
  book: Book = this.createEmptyBook();
  private originalBook: Book | null = null;
  isLoading = true;

  constructor(
    private readonly bookService: BookService,
    private readonly dialogRef: MatDialogRef<EditBookComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public readonly bookId: number
  ) {}

  ngOnInit(): void {
    this.loadBook();
  }

  private createEmptyBook(): Book {
    return {
      title: '',
      author: '',
      description: '',
      imageUrl: '',
    };
  }

  private loadBook(): void {
    this.bookService.getBook(this.bookId).subscribe({
      next: (data) => {
        this.book = { ...data };
        this.originalBook = { ...data }; // Store a copy for change detection
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading book:', err);
        this.toastrService.addNotification({
          type: 'error',
          message: 'Failed to load book details. Please try again later.',
        });
        this.dialogRef.close(false); // Close modal on failure
      },
    });
  }

  updateBook(): void {
    if (this.originalBook && !this.isBookModified(this.book, this.originalBook)) {
      this.toastrService.addNotification({
        type: 'info',
        message: 'No changes were made.',
      });
      return;
    }

    this.bookService.updateBook(this.bookId, this.book).subscribe({
      next: () => {
        console.log('Book updated successfully.');
        this.toastrService.addNotification({
          type: 'success',
          message: 'Book updated successfully.',
        });
        this.dialogRef.close(true); // Indicate success
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.toastrService.addNotification({
          type: 'error',
          message: 'Failed to update the book. Please try again.',
        });
      },
    });
  }

  private isBookModified(currentBook: Book, originalBook: Book): boolean {
    return (
      currentBook.title !== originalBook.title ||
      currentBook.author !== originalBook.author ||
      currentBook.description !== originalBook.description ||
      currentBook.imageUrl !== originalBook.imageUrl
    );
  }

  closeModal(): void {
    console.log('Dialog closed without saving.');
    this.dialogRef.close(false);
  }
}
