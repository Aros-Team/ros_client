import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../application/auth/dto/auth-response.model';
import { AuthRequest } from '../../application/auth/dto/auth-request.model';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  /**
   * access token
   */
  token: string | undefined = undefined;

  /**
   *
   */
  constructor(private http: HttpClient) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:8080/api/login', {
        username: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('refresh', response.refresh);
          this.token = response.access;
        })
      );
  }

  refresh(): Observable<AuthResponse> {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh')}`,
      },
    };

    return this.http.post<AuthResponse>('http://localhost:8080/api/refresh', {}, options).pipe(
      tap((response) => {
        localStorage.setItem('refresh', response.refresh);
        this.token = response.access;
      })
    );
  }

  logout(): void {
    this.token = undefined;
  }

  isAuthenticated() {
    return this.token != undefined;
  }

  getToken() {
    return this.token;
  }
}
