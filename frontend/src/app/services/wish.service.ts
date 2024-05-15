import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, BookDetail, UserItemResponse} from "../shared/interfaces/book.interfaces";

@Injectable({
  providedIn: 'root'
})
export class WishService {

  private apiWishes = `${environment.apiUrl}/wishes/`

  constructor(private http: HttpClient) {
  }

  getWishes(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiWishes);
  }

  geWishById(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.apiWishes + id + '/');
  }

  deleteWishById(id: number): Observable<BookDetail> {
    return this.http.delete<BookDetail>(this.apiWishes + id + '/');
  }

  createWishById(id: number): Observable<UserItemResponse> {
    return this.http.post<UserItemResponse>(this.apiWishes, {"book": id});
  }
}
