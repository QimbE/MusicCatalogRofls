import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {TokenResponse} from "../../models/TokenResponse";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public login(){
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    if (email && password){
      this.authService.login(email, password).subscribe((response: TokenResponse)=>{
        this.router.navigateByUrl("/");
      });
    }
  }

  public redirectToRegister(){
    this.router.navigateByUrl("/auth/register")
  }

}
