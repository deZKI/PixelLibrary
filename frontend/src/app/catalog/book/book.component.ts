import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book, BookDetail} from "../../shared/interfaces/book.interfaces";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {switchMap, take, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {BookComment, CommentBase} from "../../shared/interfaces/comment.interfaces";
import {User} from "../../shared/interfaces/user.interfaces";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  book!: BookDetail
  similarBooks!: Book[]
  bookId!: number

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private userService: UserService) {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.route.params.pipe(
      tap(params => {
        this.bookId = params['id']; // Получаем ID книги из параметров маршрута
      }),
      switchMap(() => this.bookService.getBookById(this.bookId)),
      tap(book => {
        this.book = book; // Сохраняем полученную книгу
      }),
      switchMap(() => this.bookService.getBooks()),
      tap(books => {
        this.similarBooks = books.filter(book => book.id !== this.book.id); // Фильтруем книги для получения похожих
      }),
      takeUntil(this.destroy$) // Прекращаем подписку при вызове destroy$
    ).subscribe();
  }

  addComment(comment: BookComment) {
    this.book.comments.push(comment);
  }

  hasUserComment() {
    return this.book.comments.filter(comment => comment.user.id == this.userService.user?.id).length == 1
  }

  removeComment(commentId: number) {
    this.book.comments = this.book.comments.filter((comment: CommentBase) => comment.id !== commentId);
  }
}
