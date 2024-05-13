import {Component, Input} from '@angular/core';
import {CommentBase} from "../../shared/interfaces/comment.interfaces";
import {CommentComponent} from "../comment/comment.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  imports: [
    CommentComponent,
    NgForOf
  ],
  standalone: true
})
export class CommentListComponent {
  @Input() comments!: CommentBase[]
}
