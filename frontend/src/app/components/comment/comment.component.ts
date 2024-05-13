import {Component, Input} from '@angular/core';
import {CommentBase} from "../../shared/interfaces/comment.interfaces";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

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

  @Input() comment!: CommentBase

  getStars(rating: number): any[] {
    return new Array(rating);
  }

}
