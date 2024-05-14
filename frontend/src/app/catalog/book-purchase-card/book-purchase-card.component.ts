import {Component, Input} from '@angular/core';
import {BookDetail} from "../../shared/interfaces/book.interfaces";

@Component({
  selector: 'app-book-purchase-card',
  templateUrl: './book-purchase-card.component.html',
  styleUrl: './book-purchase-card.component.scss'
})
export class BookPurchaseCardComponent {
  @Input() book!: BookDetail
}
