import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetail} from "../shared/interfaces/user.interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUsers = `${environment.apiUrl}/users/`

  constructor(private http: HttpClient) {
  }

  getCurrenUser(): Observable<UserDetail> {
    return this.http.get<UserDetail>(this.apiUsers + 'me/');
  }

  updateCurrenUser(user: UserDetail): Observable<UserDetail> {
    return this.http.patch<UserDetail>(this.apiUsers + user.id + '/', user);
  }


}
