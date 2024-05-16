import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentBase} from "../../shared/interfaces/comment.interfaces";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../shared/interfaces/user.interfaces";
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  imports: [
    NgIf,
    DatePipe,
    NgForOf
  ],
  standalone: true
})
export class CommentComponent {

  constructor(private userService: UserService, private commentService: CommentService) {
  }

  @Input() comment!: CommentBase
  @Output() commentDeleted = new EventEmitter<number>();

  getStars(rating: number): any[] {
    return new Array(rating);
  }

  isUserComment() {
    return this.comment.user.id == this.userService.user?.id
  }

  deleteComment() {
    if (this.comment.id) {
      this.commentService.deleteComment(this.comment.id).pipe(take(1), tap(() => {
        this.commentDeleted.emit(this.comment.id);
      })).subscribe()
    }
  }
}
