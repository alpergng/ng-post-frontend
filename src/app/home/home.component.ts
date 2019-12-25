import {Component, OnInit} from '@angular/core';
import {AddPostService} from '../add-post.service';
import {Observable, of, Subscription, timer} from 'rxjs';
import {PostPayload} from '../add-post/post-payload';
import {PostService} from '../post.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {AdminService} from '../admin.service';
import {AdminresponsePayload} from '../auth/adminresponse-payload';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<Array<PostPayload>>;
  adminResponse: AdminresponsePayload;

  constructor(private postService: PostService, private authService: AuthService, private adminService: AdminService) {
    this.adminResponse = {
      userCount: '',
      postCount: ''
    };
  }

  ngOnInit() {

    if (this.authService.isAdmin()) {
      this.adminService.getNumbers().pipe(take(1)).subscribe(x => {
        this.adminResponse.userCount = x.userCount;
        this.adminResponse.postCount = x.postCount;
        console.log(x);
      });
    }
    this.posts = this.postService.getAllPosts();
  }

  deleteSinglePost(id: string) {
    this.postService.deleteSinglePost(id).subscribe(
      (msg) => console.log(msg),
      (error) => console.log(error)
    );
  }


}
