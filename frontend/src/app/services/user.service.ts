import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {UserDetail} from "../shared/interfaces/user.interfaces";
import {tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUsers = `${environment.apiUrl}/users/`

  public user?: UserDetail

  constructor(private http: HttpClient) {
  }

  getCurrenUser(): Observable<UserDetail> {
    return this.http.get<UserDetail>(this.apiUsers + 'me/').pipe(
      tap(user => this.user = user)
    );
  }

  updateCurrenUser(user: UserDetail): Observable<UserDetail> {
    return this.http.patch<UserDetail>(this.apiUsers + user.id + '/', user);
  }

  initializeUser(): Promise<void> {
    return lastValueFrom(this.getCurrenUser()).then(() => {}).catch(() => {
    });
  }
}
