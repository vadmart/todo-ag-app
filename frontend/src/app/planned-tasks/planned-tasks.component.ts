import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { TasksListService } from '../tasks-list.service';

@Component({
  selector: 'app-planned-tasks',
  templateUrl: './planned-tasks.component.html',
  styleUrl: './planned-tasks.component.css',
  standalone: true,
  imports: [
      FormsModule,
      NgIf,
      NgFor,
      DatePipe
  ]
})
export class PlannedTasksComponent {

  protected currentDate = new Date();

  public enteredName: string = "";
  public enteredDescription: string = "";
  public selectedDate: string = "";

  constructor (private tasksListService: TasksListService) {}

  get plannedTasks() {
    return this.tasksListService.tasks.filter(task => task.completed === false);
  }

  public addTask() {
    this.tasksListService.addTask(this.enteredName, new Date(this.selectedDate), this.enteredDescription);
  }

  public removeTask(id: string) {
    this.tasksListService.removeTask(id);
  }

  public markTaskAsCompleted(id: string) {
    this.tasksListService.markTaskAsCompleted(id);
  }
}
