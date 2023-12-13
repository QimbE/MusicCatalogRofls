import {Component, OnInit} from '@angular/core';
import {Role} from "../../../models/userInfo";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";

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
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  public getErrors(control: AbstractControl | null): ValidationErrors[] {
    return Object.entries(control?.errors ?? {})
      .map(([key, msg]: [string, any]) => ({ key, msg }));
  }

  public errorTrack(index: number, err: ValidationErrors): string {
    return err['key'] ?? '';
  }

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
      username: new FormControl(this.username, [Validators.required, Validators.minLength(6)]),
      role: new FormControl(this.getRole, [Validators.required])
    })
  }

  public editUser(){
    let username = this.userForm.get("username")?.value;
    let role = this.userForm.get("role")?.value;

    if (!(username && role)){
      return;
    }

    let roleId:number = Object.values(Role).indexOf(role)+1;

    if(roleId<1){
      return;
    }

    this.usersService.editUser(this.id, username, roleId).subscribe(res => this.router.navigateByUrl("/admin/users"))
  }
}

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
