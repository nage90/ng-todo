import {Component} from '@angular/core';
import {Task} from "../../../shared/models/task.model";
import {TaskService} from "../../../shared/service/task.service";

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

  initSortOptions() {
    this.sortOptions = [
      {
        name: "date of creation",
        key: "id"
      },
      {
        name: "priority",
        key: "priority"
      },
      {
        name: "priority (reversed)",
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
