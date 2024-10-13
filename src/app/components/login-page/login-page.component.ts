import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isUserLoggedIn:boolean = false;

  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.isUserLoggedIn = false;
  }

  onSubmit() {
    let apiUrl = 'http://localhost:8080/login';
    
    if (this.loginForm.valid) {
      const params = new HttpParams()
    .set('username', this.loginForm.value.username)
    .set('password', this.loginForm.value.password);
      this.http.post<boolean>(apiUrl, null, { params }).subscribe(
        response =>{
          console.log(response);
       },
       error =>{
          console.log(error);
       }
      );
      console.log('Login Successful', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
