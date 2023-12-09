import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {TokenResponse} from "../../../models/TokenResponse";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public register(){
    let username = this.registerForm.get('username')?.value;
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;

    if (email && password && username){
      this.authService.register(username, email, password).subscribe((response: TokenResponse)=>{
        this.router.navigateByUrl("/");
      });
    }
  }

  public redirectToLogin(){
    this.router.navigateByUrl("/auth/login")
  }

}
