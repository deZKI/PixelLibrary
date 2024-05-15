import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Book} from "../../shared/interfaces/book.interfaces";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  books!: Book[]
  totalPrice: number = 0

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {
    this.basketService.getBaskets().pipe(
      take(1),
      tap(books => {
        this.books = books.map(book => book.book)
        this.totalPrice = this.books.reduce((total, book) => total + book.price, 0);
      })
    ).subscribe()
  }
}

