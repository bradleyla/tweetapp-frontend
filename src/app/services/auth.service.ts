import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'http://localhost:9090/api/v1.0/tweets';

  constructor(private http: HttpClient, private userService: UserService) {}

  register(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post<any>(`${this.AUTH_URL}/register`, data, {
      headers: headers,
    });
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post<any>(`${this.AUTH_URL}/login`, data, {
      headers: headers,
    });
  }

  resetPassword(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const username = this.userService.getUser()?.username;
    return this.http.post<any>(`${this.AUTH_URL}/${username}/forgot`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.AUTH_URL}/users/all`);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get<any>(`${this.AUTH_URL}/user/search/${username}`);
  }

  getUserByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.AUTH_URL}/user/search/email/${email}`);
  }

  logout() {
    localStorage.clear();
    this.userService.clearUser();
  }

  getToken(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }


}
