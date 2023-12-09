import { Routes } from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";
import {Role} from "./models/userInfo";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  { path: '**', redirectTo: '/' }
];
