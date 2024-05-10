import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../shared/models/book";

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

}
