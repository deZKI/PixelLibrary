import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../shared/interfaces/book.interfaces";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  books: Book[] = []

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks().pipe(
      take(1),
      tap(books => {
        this.books = books
      })
    ).subscribe()
  }

}
