import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {error} from 'util';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  constructor(private authService: AuthService ) {

  }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }
}
