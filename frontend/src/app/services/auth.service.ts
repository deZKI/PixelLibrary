import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthResponse} from "../shared/interfaces/auth.interfaces";
import {environment} from "../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`
  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { email, password })
      .pipe(
        tap(response => {
          this.saveTokens(response.access, response.refresh);
        })
      );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registration/`, { email, password })
      .pipe(
        tap(response => {
          this.saveTokens(response.access, response.refresh);
        })
      );
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token found');
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken })
      .pipe(
        tap(response => {
          this.saveTokens(response.access, refreshToken);
        })
      );
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}
