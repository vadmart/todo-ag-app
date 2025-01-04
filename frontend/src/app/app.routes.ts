import { Routes } from '@angular/router';
import { PlannedTasksComponent } from './planned-tasks/planned-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

export const routes: Routes = [
    {path: "", redirectTo: "planned-tasks", pathMatch: "full"},
    {path: "planned-tasks", component: PlannedTasksComponent},
    {path: "completed-tasks", component: CompletedTasksComponent}
];
