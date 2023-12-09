import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/userInfo";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  id: string;
  username: string;
  role: Role;

  userForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.maxLength(36), Validators.minLength(36)]),
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    this.id = "123"
    this.username = "123"
    this.role = 1
  }

  public get getRole(){
    return Role[this.role]
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id')!;
        this.username = params.get('username')!;
        this.role = Object.values(Role).indexOf(toTitleCase(params.get('role')!))+1
        return new Observable();
      })
    ).subscribe();

    this.userForm = new FormGroup({
      id: new FormControl(this.id, [Validators.required, Validators.maxLength(36), Validators.minLength(36)]),
      username: new FormControl(this.username, [Validators.required, Validators.minLength(6)]),
      role: new FormControl(this.getRole, [Validators.required])
    })
  }

  public editUser(){
    let id = this.userForm.get("id")?.value;
    let username = this.userForm.get("username")?.value;
    let role = this.userForm.get("role")?.value;

    if (!(id && username && role)){
      return;
    }

    let roleId:number = Object.values(Role).indexOf(role)+1;

    if(roleId<1){
      return;
    }

    this.usersService.editUser(id, username, roleId).subscribe(res => this.router.navigateByUrl("/admin/users"))
  }
}

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
