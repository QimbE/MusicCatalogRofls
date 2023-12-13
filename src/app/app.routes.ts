import { Routes } from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";
import {Role} from "./models/userInfo";
import {SongsListComponent} from "./components/songs-list/songs-list.component";

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
  {
    path:'songs',
    loadChildren: ()=> import('./songs/songs.module').then(m => m.SongsModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin, Role.DatabaseAdmin, Role.Default]}
  },
  { path: '**',
    loadComponent: () => SongsListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin, Role.DatabaseAdmin, Role.Default]}
  }
];
