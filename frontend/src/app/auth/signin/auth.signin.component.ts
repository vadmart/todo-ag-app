import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Auth from '../user.type';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  login() {
    this.http.post<Auth>("http://localhost:5000/login", {
      username: this.username,
      password: this.password
    }).subscribe(data => {
      alert(data);
    })
  }
}
