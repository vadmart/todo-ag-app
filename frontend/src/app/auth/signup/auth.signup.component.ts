import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth.signup.component.html',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './auth.signup.component.css'
})
export class AuthSignupComponent {
  public username: string = "";
  public password: string = "";
  public errorMessage: string = "";

  constructor(private http: HttpClient) {}

  register() {
    this.http.post<{message: string}>("http://127.0.0.1:8000/register", {
      username: this.username,
      password: this.password
    }).subscribe({error: err => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }});
  }
}
