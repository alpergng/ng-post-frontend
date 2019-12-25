import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginPayload} from './login-payload';
import {JwtAutRepsonse} from './jwt-aut-repsonse';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {error} from 'util';
import {Router} from '@angular/router';
import {PostPayload} from '../add-post/post-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutRepsonse>(this.url + 'login', loginPayload).pipe(map( data => {
        this.localStorageService.store('authenticationToken', data.authenticationToken);
        this.localStorageService.store('username', data.username);
        this.localStorageService.store('userType', data.userType);
        return true;
    }));
  }
  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }
  isAdmin(): boolean {
    return this.localStorageService.retrieve('userType').startsWith('admin');
  }
  deleteSingleUser(username: string): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/users/delete/' + username)
      .pipe(map(data => {
        console.log('delete user success');
        this.logout();
      }));
  }
  getUsername(): string {
    return this.localStorageService.retrieve('username');
  }
  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('userType');
    this.router.navigateByUrl('/logout');
  }
}
