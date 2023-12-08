import { Component } from '@angular/core';
import {BaseUser, RegisterUser} from "../../models/baseUser";
import {AuthenticationService} from "../../services/authentication.service";
import {TokenResponse} from "../../models/TokenResponse";
import {GetMeResponse} from "../../models/getMeResponse";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-authform',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './authform.component.html',
  styleUrl: './authform.component.css'
})
export class AuthformComponent {
  registerUser = new RegisterUser();

  constructor(private authService: AuthenticationService) {
  }

  register(user: RegisterUser){
    this.authService.register(user).subscribe((response: TokenResponse)=>{
      localStorage.setItem("authToken", response.data)
    });
  }

  getMe(){
    this.authService.getMe().subscribe((response:GetMeResponse)=>{
      console.log(response)
    })
  }
}
