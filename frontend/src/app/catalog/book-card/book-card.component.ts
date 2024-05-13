import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../shared/interfaces/book.interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  @Input() book!: Book

  ngOnInit() {

  }

  navigateToBookDetail() {
    this.router.navigate(['books', this.book.id], {relativeTo: this.route.parent});
  }
}
