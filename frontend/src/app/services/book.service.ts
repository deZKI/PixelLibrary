import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookInterfaces, BookDetail} from "../shared/interfaces/book.interfaces";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBooks = `${environment.apiUrl}/books/`

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<BookInterfaces[]> {
    return this.http.get<BookInterfaces[]>(this.apiBooks);
  }

  getBookById(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.apiBooks + id + '/');
  }
}
