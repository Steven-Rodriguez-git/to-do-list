import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  token: string;
  fullName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$ = new BehaviorSubject<LoginRes | null>(this.restore());
  user$ = this.auth$.asObservable();

  constructor(private http: HttpClient) {}

  private restore(): LoginRes | null {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    return token && email && fullName ? { token, email, fullName } : null;
  }

  get isLoggedIn(): boolean {
    return !!this.auth$.value?.token;
  }

  login(body: LoginReq) {
    return this.http
      .post<LoginRes>(`${environment.apiBaseUrl}/auth/login`, body)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', res.email);
          localStorage.setItem('fullName', res.fullName);
          this.auth$.next(res);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('fullName');
    this.auth$.next(null);
  }
}
