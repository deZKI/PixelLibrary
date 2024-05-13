import {Component, Input} from '@angular/core';
import {BookInterfaces} from "../../shared/interfaces/book.interfaces";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  @Input() books: BookInterfaces[] = []
}
