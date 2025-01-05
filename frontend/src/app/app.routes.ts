import { Routes } from '@angular/router';
import { PlannedTasksComponent } from './planned-tasks/planned-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import {AuthSignupComponent} from "./auth/signup/auth.signup.component";
import {AuthSigninComponent} from './auth/signin/auth.signin.component';

export const routes: Routes = [
    {path: "", redirectTo: "planned-tasks", pathMatch: "full"},
    {path: "planned-tasks", component: PlannedTasksComponent},
    {path: "completed-tasks", component: CompletedTasksComponent},
    {path: "sign-up", component: AuthSignupComponent},
    {path: "sign-in", component: AuthSigninComponent}
];
