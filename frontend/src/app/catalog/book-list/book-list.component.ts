import {Component, Input} from '@angular/core';
import {Book} from "../../shared/models/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  @Input() books: Book[] = []
}
