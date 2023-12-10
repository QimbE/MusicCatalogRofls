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
  {
    path:'artists',
    loadChildren: ()=> import('./artists/artists.module').then(m => m.ArtistsModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin, Role.DatabaseAdmin, Role.Default]}
  },
  {
    path:'releases',
    loadChildren: ()=> import('./releases/releases.module').then(m => m.ReleasesModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin, Role.DatabaseAdmin, Role.Default]}
  },
  { path: '**', redirectTo: '' }
];
