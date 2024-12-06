import { Routes } from '@angular/router';
import {LoginComponent} from './home/login/login.component';
import {TrainingComponent} from './training/training.component';
import {BasicComponent} from './training/theorie/basic/basic.component';
import {TaptrackComponent} from './training/praxis/taptrack/taptrack.component';
import {StatistikComponent} from './training/statistik/statistik.component';

export const routes: Routes = [
  {path: '', redirectTo: "/login", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'basic', component: BasicComponent},
  {path: 'taptrack', component: TaptrackComponent},
  {path: 'statistik', component: StatistikComponent}
];
