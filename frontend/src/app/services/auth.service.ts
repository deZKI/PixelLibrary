import {HttpClient} from "@angular/common/http";
import {RegistrationForm} from "../interfaces/auth.interfaces";
import {Observable} from "rxjs";
import {Email} from "../interfaces/shared.interfaces";
import {environment} from "../../enviroments/environment";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  registrationURL = 'auth/registration'

  constructor(
    private http: HttpClient
  ) {
  }

  registration(registrationForm: RegistrationForm): Observable<Email> {
    return this.http.post<Email>(`${environment.url}/${environment.api}/${this.registrationURL}/`, registrationForm)
  }
}
