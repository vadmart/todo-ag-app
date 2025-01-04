import { Component } from '@angular/core';
import { TasksListService } from '../tasks-list.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe} from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    DatePipe,
]
})
export class CompletedTasksComponent {
  public tasksIdsForDeletion: string[] = [];

  constructor (private tasksListService: TasksListService) {}

  get completedTasks() {
    return this.tasksListService.tasks.filter(task => task.completed === true);
  }

  public deleteCompletedTasks() {
    this.tasksListService.deleteCompletedTasks();
  }

  public addSelectedTaskId (id: string) {
    this.tasksIdsForDeletion.push(id);
  }

  public removeSelectedTaskId(id: string) {
    this.tasksIdsForDeletion = this.tasksIdsForDeletion.filter(taskId => taskId !== id);
  }

  public onCheckboxChange(event: Event, taskId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.addSelectedTaskId(taskId);
    } else {
      this.removeSelectedTaskId(taskId);
    }
  }

  public removeSelectedTasks() {
    this.tasksListService.removeSelectedTasksByIds(this.tasksIdsForDeletion);
    this.tasksIdsForDeletion.length = 0;
  }

  get isAnyTaskSelected() {
    return this.tasksIdsForDeletion.length > 0
  }

}
