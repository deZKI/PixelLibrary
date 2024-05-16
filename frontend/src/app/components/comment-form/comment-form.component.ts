import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookComment} from "../../shared/interfaces/comment.interfaces";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {take, tap} from "rxjs/operators";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    StarRatingComponent,
    MatButton,
    MatInput,
    MatError,
    MatLabel,
    NgIf
  ],
  standalone: true
})
export class CommentFormComponent {
  commentForm: FormGroup;
  rating: number = 0;

  @Input() entityId!: number;
  @Output() commentAdded = new EventEmitter<BookComment>();

  constructor(private fb: FormBuilder, private userService: UserService, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.commentForm.valid && this.userService.user) {
      this.commentService.createComment({
        text: this.commentForm.value.text,
        book: this.entityId,
        rating: this.rating
      }).pipe(
        take(1),
        tap(comment => {
          this.commentAdded.emit(comment);
          this.commentForm.reset();
          this.rating = 0; // Reset rating
        })
      ).subscribe();
    }
  }
}
