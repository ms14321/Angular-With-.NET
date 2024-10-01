import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../app/http.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,MatCardModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  builder=inject(FormBuilder);
  router=inject(Router);
  httpService=inject(HttpService);
  LoginForm=this.builder.group({
    email:['',Validators.required],
    password:['',Validators.required]
  });

  onLogin()
  {
    const email = this.LoginForm.value.email!;
    const password = this.LoginForm.value.password!;
    this.httpService.login(email,password).subscribe((result)=>
    {
      console.log(result);
      localStorage.setItem('token', result.token);
      this.router.navigateByUrl('/');
    })

  }

}
