import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, BookDetail} from "../shared/interfaces/book.interfaces";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBooks = `${environment.apiUrl}/books/`

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiBooks);
  }

  getBookById(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.apiBooks + id + '/');
  }
}
