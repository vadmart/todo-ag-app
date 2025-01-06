import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import Task from '../task.type';

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
  public selectedDate: string = "";
  public tasks: Task[] = [];

  constructor (private tasksListService: TasksService) {
    this.getTasks();
  }

  getTasks() {
    this.tasksListService.getPlannedTasks().subscribe({next: (tasks) => {
      tasks.map(task => {
        task.deadline = new Date(task.deadline);
        this.tasks.push(task)
      });
      this.tasks.sort((task1, task2) => task1.deadline.getTime() - task2.deadline.getTime());
    },
    error: (e) => console.error(e)})
  }

  public addTask() {
    this.tasksListService.addTask(this.enteredName, new Date(this.selectedDate)).subscribe({next: (task) => {
      task.deadline = new Date(task.deadline)
      this.tasks.push(task);
      this.tasks.sort((task1, task2) => task1.deadline.getTime() - task2.deadline.getTime());
      }})
  }

  public removeTask(id: number) {
    this.tasksListService.removeTask(id).subscribe({next: (task) => {
        this.tasks = this.tasks.filter(tsk => tsk.id !== task.id);
      }})
  }

  public markTaskAsCompleted(ev: Event, id: number) {
    const checkbox = ev.target as HTMLInputElement;
    if (checkbox.checked) {
      this.tasksListService.markTaskAsCompleted(id).subscribe({next: (task) => {
        this.tasks = this.tasks.filter(tsk => tsk.id !== task.id)
        }})
    }
  }
}
