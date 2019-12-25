import { Injectable } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {AdminresponsePayload} from './auth/adminresponse-payload';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminResponsePayload: AdminresponsePayload;
  constructor(private authService: AuthService, private httpClient: HttpClient) {

  }
  deleteSingleUser(username: string): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/admin/delete/' + username)
      .pipe(map(data => {
        console.log('delete user success');
        this.authService.logout();
      }));
  }
  getNumbers(): Observable<AdminresponsePayload> {
    return this.httpClient.get<AdminresponsePayload>('http://localhost:8080/api/admin/get');
  }
}
