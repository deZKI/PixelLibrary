import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentBase} from "../../shared/interfaces/comment.interfaces";
import {CommentComponent} from "../comment/comment.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  imports: [
    CommentComponent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class CommentListComponent {
  @Input() comments!: CommentBase[]
  @Output() commentDeleted = new EventEmitter<number>();

  removeComment(commentId: number) {
    this.commentDeleted.emit(commentId);
  }
}
