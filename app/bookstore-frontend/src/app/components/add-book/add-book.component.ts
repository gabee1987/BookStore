import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButton
  ],
  standalone: true
})
export class AddBookComponent {
  book: Book = {
    title: '',
    author: '',
    description: '',
    imageUrl: '',
  };

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<AddBookComponent>,
              private toastrService: ToastrService
  ) {}

  addBook(): void {
    this.bookService.createBook(this.book).subscribe({
      next: () => {
        this.toastrService.addNotification({
          type: 'success',
          message: 'Book added successfully!',
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastrService.addNotification({
          type: 'error',
          message: 'Failed to add the book. Please try again.',
        });
      },
    });
  }

  closeModal(): void {
    this.dialogRef.close(); // Close modal without action
  }
}
