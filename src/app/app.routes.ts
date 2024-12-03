import { Routes } from '@angular/router';
import {LoginComponent} from './home/login/login.component';
import {TrainingComponent} from './training/training.component';

export const routes: Routes = [
  {path: '', redirectTo: "/login", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent}
];
