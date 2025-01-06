import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Task from './task.type';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private taskList: Task[] = [];

  constructor(private http: HttpClient) {}

  public addTask(name: string, deadline: Date){
    return this.http.post<Task>("http://127.0.0.1:8000/add-task", {name, deadline})
  }

  public removeTask(id: number) {
    return this.http.delete<Task>("http://127.0.0.1:8000/delete-planned-task", {body: {id}})
  }

  public markTaskAsCompleted(id: number) {
    return this.http.post<Task>("http://127.0.0.1:8000/mark-task-as-completed", {id})
  }

  public removeSelectedTasksByIds(ids: string[]) {
    // for (let id of ids) {
    //   this.taskList = this.taskList.filter(task => task.uuid !== id);
    // }
  }

  public deleteCompletedTasks(ids?: number[]) {
    return this.http.delete<Task[]>("http://127.0.0.1:8000/delete-completed-tasks", {body: {ids}})
  }

  public getPlannedTasks() {
    return this.http.get<Task[]>("http://127.0.0.1:8000/planned-tasks");
  }

  public getCompletedTasks() {
    return this.http.get<Task[]>("http://127.0.0.1:8000/completed-tasks");
  }

  get tasks() {
    return Array.from(this.taskList);
  }
}
