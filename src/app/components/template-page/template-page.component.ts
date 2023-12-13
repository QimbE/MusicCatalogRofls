import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {Role} from "../../models/userInfo";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-template-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf
  ],
  templateUrl: './template-page.component.html',
  styleUrl: './template-page.component.css'
})
export class TemplatePageComponent {

  rolesToContentEdit: Role[] = [Role.Admin]
  public get accessToUserManagment(){
    const user = this.authService.userValue;
    return user && this.rolesToContentEdit.includes(user.roleId);
  }

  public get isUserloggedIn(){
    return  this.authService.userValue !==null;
  }
  constructor(private router: Router, private authService: AuthenticationService) {

  }

  navigateToHomePage(){
    this.router.navigate(['/'])
  }
  navigateToArtistsPage(){
    this.router.navigate(['artists/list'])
  }

  navigateToUsersPage(){
    this.router.navigate(['admin/users'])
  }

  navigateToLoginPage(){
    this.router.navigate(['auth/login'])
  }

  logOut(){
    this.authService.logout();
    window.location.reload();
  }
}
