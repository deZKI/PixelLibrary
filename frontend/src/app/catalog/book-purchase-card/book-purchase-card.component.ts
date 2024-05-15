import {Component, Input} from '@angular/core';
import {BookDetail} from "../../shared/interfaces/book.interfaces";
import {BasketService} from "../../services/basket.service";
import {WishService} from "../../services/wish.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-book-purchase-card',
  templateUrl: './book-purchase-card.component.html',
  styleUrl: './book-purchase-card.component.scss'
})
export class BookPurchaseCardComponent {
  @Input() book!: BookDetail

  constructor(private basketService: BasketService,
              private wishService: WishService
  ) {
  }

  addToBasket() {
    this.basketService.createBasketById(this.book.id).pipe(
      take(1),
      tap(basket => {
        this.book.in_basket = true
      })
    ).subscribe()
  }

  removeBasket() {
    this.basketService.deleteBasketById(this.book.id).pipe(
      take(1),
      tap(basket => {
        this.book.in_basket = false
      })
    ).subscribe()
  }


  addToWish() {
    this.wishService.createWishById(this.book.id).pipe(
      take(1),
      tap(basket => {
        this.book.in_wishes = true
      })
    ).subscribe()
  }

  removeWish() {
    this.wishService.deleteWishById(this.book.id).pipe(
      take(1),
      tap(basket => {
        this.book.in_wishes = false
      })
    ).subscribe()
  }
}
