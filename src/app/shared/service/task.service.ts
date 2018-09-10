import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as _ from 'underscore';
import 'rxjs/add/operator/distinctUntilChanged';
import {Task} from "../models/task.model";

@Injectable()
export class TaskService {

  public tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks = this.tasksSubject.asObservable().distinctUntilChanged();


  public selectedTaskSubject = new BehaviorSubject<Task>(new Task());
  public selectedTask = this.selectedTaskSubject.asObservable().distinctUntilChanged();




  constructor() {

  }

  addNewTask(task){
    let currentTaskList = [];
    Object.assign(currentTaskList, this.tasksSubject.value);
    currentTaskList.push(task);
    this.tasksSubject.next(currentTaskList);
  }

  updateTask(task) {
    const currentTaskList = [];
    Object.assign(currentTaskList, this.tasksSubject.value);
    _.extend(_.findWhere(currentTaskList, {
      id: task.id
    }), task);

    this.tasksSubject.next(currentTaskList);
  }

  deleteTask(task){
    this.tasksSubject.next(_.without(this.tasksSubject.value, _.findWhere(this.tasksSubject.value, {
      id: task.id
    })));
  }






}
