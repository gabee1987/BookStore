package com.example.bookstore.backend.controller;

import com.example.bookstore.domain.model.Book;
import com.example.bookstore.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * Get all books.
     *
     * @return List of all books
     */
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    /**
     * Get a book by ID.
     *
     * @param id The ID of the book
     * @return The book details
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("Book with ID %d not found", id)));
    }

    /**
     * Create a new book.
     *
     * @param book The book details
     * @return The created book
     */
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book createdBook = bookService.saveBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    /**
     * Update a book.
     *
     * @param id   The ID of the book
     * @param book The updated book details
     * @return The updated book
     */
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @RequestBody Book book) {
        if (!bookService.getBookById(id).isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with ID %d not found", id));
        }
        book.setId(id);
        Book updatedBook = bookService.saveBook(book);
        return ResponseEntity.ok(updatedBook);
    }

    /**
     * Delete a book.
     *
     * @param id The ID of the book
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        if (!bookService.getBookById(id).isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with ID %d not found", id));
        }
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
