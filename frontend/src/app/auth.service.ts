import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataKey: string = 'user';

  constructor(private router: Router) {}

  setUserData(userData: string): void {
    localStorage.setItem(this.userDataKey, userData);
  }

  getUserData(): string | null {
    return localStorage.getItem(this.userDataKey);
  }

  logout(): void {
    localStorage.removeItem(this.userDataKey);
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    const userData = this.getUserData();
    return !!userData;
  }
}
