import {Component} from '@angular/core';
import {Task} from "../../../shared/models/task.model";
import {TaskService} from "../../../shared/service/task.service";
import * as _ from 'underscore';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent{

  tasks: Task[];
  sortOptions: object[] = [];
  selectedSortOption: {} = {};
  showCompletedTasks: boolean = true;
  showCurrentTasks: boolean = true;
  selectedTask: Task;

  constructor(private taskService: TaskService) {

    this.initSortOptions();
    this.selectedSortOption = this.sortOptions[0];

    this.taskService.tasks.subscribe((data) => {
      this.tasks = data;
    });

    this.taskService.selectedTask.subscribe((data) => {
      this.selectedTask = data;
    });

  }

  getTaskList(){

    if(this.selectedSortOption['reversed']){
      return _.sortBy(this.tasks, this.selectedSortOption['key']).reverse();
    }

    return _.sortBy(this.tasks, this.selectedSortOption['key']);
  }


  initSortOptions() {
    this.sortOptions = [
      {
        name: "date of creation (ascending)",
        key: "id"
      },
      {
        name: "date of creation (descending)",
        key: "id",
        reversed: true
      },
      {
        name: "priority (ascending)",
        key: "priority"
      },
      {
        name: "priority (descending)",
        key: "priority",
        reversed: true
      }
    ];
  }


  deleteTask(task) {
    this.taskService.deleteTask(task);
  }

  setCompleted(task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task.completed);
  }

  editTask(task) {

    if (this.selectedTask && task.id === this.selectedTask.id) {
      this.taskService.selectedTaskSubject.next(new Task());
      return;
    }

    this.taskService.selectedTaskSubject.next(task);
  }


  displayTask(task) {

    if (this.showCompletedTasks && this.showCurrentTasks) {
      return true;
    }

    if (this.showCompletedTasks && !this.showCurrentTasks && task.completed) {
      return true
    }

    if (this.showCurrentTasks && !this.showCompletedTasks && !task.completed) {
      return true;
    }

    if (!this.showCompletedTasks && !this.showCurrentTasks) {
      return false;
    }

    return false;
  }


}
