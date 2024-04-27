import {HttpClient} from "@angular/common/http";
import {authForm, TokenAccess, TokenPairObtain, TokenRefresh} from "../interfaces/auth.interfaces";
import {Observable} from "rxjs";
import {Email} from "../interfaces/shared.interfaces";
import {environment} from "../../enviroments/environment";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  registrationURL = 'auth/registration'
  loginURL = 'auth/login'
  refreshURL = 'token/refresh'

  constructor(
    private http: HttpClient
  ) {
  }

  registration(authForm: authForm): Observable<Email> {
    return this.http.post<Email>(`${environment.url}/${environment.api}/${this.registrationURL}/`, authForm)
  }

  login(authForm: authForm): Observable<TokenPairObtain> {
    return this.http.post<TokenPairObtain>(`${environment.url}/${environment.api}/${this.loginURL}/`, authForm)
  }

  refresh(refreshToken: TokenRefresh) {
    return this.http.post<TokenAccess>(`${environment.url}/${environment.api}/${this.refreshURL}/`, refreshToken)
  }
}
