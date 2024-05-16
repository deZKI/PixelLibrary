import {Component, EventEmitter, Output} from '@angular/core';
import {BookComment} from "../../shared/interfaces/comment.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
  standalone: true
})
export class CommentFormComponent {
  commentForm: FormGroup;

  @Output() commentAdded = new EventEmitter<BookComment>();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.commentForm.valid && this.userService.user) {
      const newComment: BookComment = {
        id: Date.now(),  // Use a more appropriate ID generation in real apps
        user: this.userService.user,
        text: this.commentForm.value.text,
        created_at: new Date().toISOString(),
        edited_at: new Date().toISOString(),
        rating: 0,  // Assuming default rating is 0
        edited: false
      };
      this.commentAdded.emit(newComment);
      this.commentForm.reset();
    }
  }
}
