import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PostPayload} from './add-post/post-payload';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {error} from 'util';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {AdminService} from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) {
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/all');
  }
  deleteSinglePost(id: string): Observable<any> {
    return this.httpClient.delete<PostPayload>('http://localhost:8080/api/posts/delete/' + id)
      .pipe(map(data => {
        console.log('delete success');
        const posts = this.getAllPosts();
        posts.subscribe(result => {
          if (result.length === 0) {
            this.authService.deleteSingleUser(this.authService.getUsername()).subscribe(
              msg => console.log(msg)
              // tslint:disable-next-line:no-shadowed-variable
              , error => console.log(error)
            );
          } else {
            this.router.navigateByUrl('/home');
          }});
      }));
  }
}
