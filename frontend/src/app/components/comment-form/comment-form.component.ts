import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookComment} from "../../shared/interfaces/comment.interfaces";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class CommentFormComponent {
  commentForm: FormGroup;

  @Input() entityId!: number
  @Output() commentAdded = new EventEmitter<BookComment>();

  constructor(private fb: FormBuilder, private userService: UserService, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.commentForm.valid && this.userService.user) {
      this.commentService.createComment({text: this.commentForm.value.text, book: this.entityId, rating: 5}).pipe(
        take(1),
        tap(comment => {
          this.commentAdded.emit(comment);
          this.commentForm.reset()
        } )
      )
    }
  }
}
