import {Component, Input} from '@angular/core';
import {UsersGQL} from "../../../../generated/graphql";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users: any[] = [];
  startCursor: string | null = null;
  endCursor: string | null = null;
  hasNextPage = true;
  hasPreviousPage = false;
  count:number = 5;

  constructor(private query: UsersGQL, private router: Router, private usersService: UsersService) {
  }

  public loadNext(){
    this.usersService.nextPage(this.count, this.endCursor).subscribe(result => {
      const { edges, pageInfo } = result.data.users!;
      this.users = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    })
  }
  public loadPrev(){
    this.usersService.prevPage(this.count, this.startCursor).subscribe(result => {
      const { edges, pageInfo } = result.data.users!;
      this.users = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    });
  }

  navigateToUserForm(id:string,username: string, role: string) {
    // Перенаправление на страницу формы с предзаполненными данными
    this.router.navigate
    (['admin/users/user-form'], { queryParams: { id, username, role } });

  }
}
