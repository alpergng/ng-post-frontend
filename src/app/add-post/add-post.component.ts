import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  picUrl = new FormControl('');
  body = new FormControl('');
  constructor(private addPostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      picUrl: this.picUrl,
      body: this.body
    });
    this.postPayload = {
      id: '',
      title: '',
      picUrl: '',
      content: '',
      username: ''
    };
  }

  ngOnInit() {
  }

  addPost() {
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.picUrl = this.addPostForm.get('picUrl').value;
    this.postPayload.content = this.addPostForm.get('body').value;
    this.addPostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, err => {
      console.log('Failure Response');
    });
  }
}
