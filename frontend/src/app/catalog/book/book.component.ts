import {Component, OnInit} from '@angular/core';
import {Book, BookDetail} from "../../shared/interfaces/book.interfaces";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {switchMap, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  book!: BookDetail
  similarBooks!: Book[]
  bookId!: number

  constructor(private route: ActivatedRoute,
              private bookService: BookService) {
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id']
    this.bookService.getBookById(this.bookId).pipe(
      take(1),
      tap(book => {
        this.book = book
      }),
      switchMap(() => this.bookService.getBooks().pipe(
        tap(books => this.similarBooks = books.filter(book => book.id != this.bookId))
      ))
    ).subscribe()

  }
}
