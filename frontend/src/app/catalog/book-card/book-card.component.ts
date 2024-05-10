import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../shared/models/book";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent implements OnInit {

  @Input() book!: Book

  ngOnInit() {

  }
}
