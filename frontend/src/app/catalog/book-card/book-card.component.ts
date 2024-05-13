import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../shared/interfaces/book.interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() book!: Book

  ngOnInit() {

  }

  navigateToBookDetail() {
    this.router.navigate([this.router.url + '/books/' + this.book.id]);
  }
}
