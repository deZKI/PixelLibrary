import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book, BookDetail, UserItemResponse} from "../shared/interfaces/book.interfaces";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private apiBaskets = `${environment.apiUrl}/baskets/`

  constructor(private http: HttpClient) {
  }

  getBaskets(): Observable<UserItemResponse[]> {
    return this.http.get<UserItemResponse[]>(this.apiBaskets);
  }

  getBasketById(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.apiBaskets + id + '/');
  }

  deleteBasketById(id: number): Observable<BookDetail> {
    return this.http.delete<BookDetail>(this.apiBaskets + id + '/');
  }

  createBasketById(id: number): Observable<UserItemResponse> {
    return this.http.post<UserItemResponse>(this.apiBaskets, {"book": id});
  }

}
