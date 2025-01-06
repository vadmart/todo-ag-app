import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from './auth.service';
import {NgIf} from '@angular/common';

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
    ],
})
export class AppComponent {
  public userData: {access: string, username: string} | null = null;

  constructor(private authService: AuthService) {
    const receivedData = this.authService.getUserData();
    if (receivedData) {
      this.userData = JSON.parse(receivedData);
    }
  }

  logout() {
    this.authService.logout();
  }
}
