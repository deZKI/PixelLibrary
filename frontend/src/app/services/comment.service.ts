import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../enviroments/environment";
import {BookComment, BookCommentCreation} from "../shared/interfaces/comment.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiBookUrl = `${environment.apiUrl}/bcomment/`

  constructor(private http: HttpClient) {
  }

  createComment(comment: BookCommentCreation): Observable<BookComment> {
    return this.http.post<BookComment>(this.apiBookUrl, comment);
  }

  deleteComment(id: number) {
    return this.http.delete(this.apiBookUrl + id + '/')
  }

}
