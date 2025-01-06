import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Auth from '../user.type';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth.signin.component.html',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './auth.signin.component.css'
})
export class AuthSigninComponent {
  public username: string = "";
  public password: string = "";
  public errorMessage: string = "";

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  login() {
    this.http.post<Auth>("http://127.0.0.1:8000/login", {
      username: this.username,
      password: this.password
    })
      .subscribe({
        next: (auth) => {
            this.authService.setUserData(JSON.stringify(auth));
            this.router.navigate(["/planned-tasks"]);
        },
        error: (err) => {this.errorMessage = err}
      })
  }
}
