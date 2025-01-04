import { Injectable } from '@angular/core';

class Task {
  readonly uuid: string;
  name: string;
  deadline: Date;
  completed: boolean = false;

  constructor(name: string, deadline: Date, description?: string) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.deadline = deadline;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TasksListService {
  private taskList: Task[] = [];

  public addTask(name: string, deadline: Date, description?: string){
    const task = new Task(name, deadline, description);
    this.taskList.push(task);
    this.taskList.sort((task1, task2) => task1.deadline.getTime() - task2.deadline.getTime());
  }

  public removeTask(id: string) {
    this.taskList = this.taskList.filter(task => task.uuid !== id);
  }

  public markTaskAsCompleted(id: string) {
    const task = this.taskList.find(task => task.uuid === id)!;
    task.completed = true;
  }

  public removeSelectedTasksByIds(ids: string[]) {
    for (let id of ids) {
      this.taskList = this.taskList.filter(task => task.uuid !== id);
    }
  }

  public deleteCompletedTasks() {
    this.taskList = this.taskList.filter(task => task.completed === false);
  }

  get tasks() {
    return Array.from(this.taskList);
  }
}