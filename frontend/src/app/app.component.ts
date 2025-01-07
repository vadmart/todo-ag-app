import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from './auth.service';
import {NgIf} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';

@Component({
    selector: 'todo-app',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgIf
    ]
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  get userData() {
    const userData = this.authService.getUserData();
    if (userData) {
      return JSON.parse(userData);
    }
    return userData
  }

  logout() {
    this.authService.logout();
  }
}
