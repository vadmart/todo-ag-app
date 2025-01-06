import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe} from '@angular/common';
import Task from '../task.type';

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
  public completedTasks: Task[] = []
  public selectedTasksIdsForDeletion: number[] = [];

  constructor (private tasksListService: TasksService) {
    this.getCompletedTasks();
  }

  public getCompletedTasks() {
    this.tasksListService.getCompletedTasks().subscribe({next: (tasks) => {
        tasks.map(tsk => {
          tsk.deadline = new Date(tsk.deadline)
          this.completedTasks.push(tsk);
        });
        this.completedTasks.sort((task1, task2) => task1.deadline.getTime() - task2.deadline.getTime());
      }})
  }

  public deleteSelectedCompletedTasks() {
    this.tasksListService.deleteCompletedTasks(this.selectedTasksIdsForDeletion).subscribe({next: tasks => {
        tasks.map(tsk => {
          this.completedTasks = this.completedTasks.filter(val => val.id !== tsk.id);
        })
        this.selectedTasksIdsForDeletion = [];
      }})
  }

  public deleteAllCompletedTasks() {
    this.tasksListService.deleteCompletedTasks().subscribe({next: () => {
      this.completedTasks = []
      this.selectedTasksIdsForDeletion = [];
    }})
  }

  public onCheckboxChange(event: Event, taskId: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTasksIdsForDeletion.push(taskId);
    } else {
      this.selectedTasksIdsForDeletion = this.selectedTasksIdsForDeletion.filter(val => val !== taskId);
    }
  }

  // public removeSelectedTasks() {
  //   this.tasksListService.removeSelectedTasksByIds(this.tasksIdsForDeletion);
  // }

  // get isAnyTaskSelected() {
  //   return this.tasksIdsForDeletion.length > 0
  // }

}
