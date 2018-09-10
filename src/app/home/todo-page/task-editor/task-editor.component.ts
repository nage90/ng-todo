import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../../shared/models/task.model";
import {TaskService} from "../../../shared/service/task.service";

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent{

  editedTask: Task;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder,
              private taskService: TaskService) {

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      priority: ['', Validators.required]
    });

    this.taskService.selectedTask.subscribe((data) => {
      this.editedTask = data;

      this.taskForm.controls['name'].patchValue(this.editedTask && this.editedTask.name ? this.editedTask.name : "");
      this.taskForm.controls['priority'].patchValue(this.editedTask && this.editedTask.priority ? this.editedTask.priority : 1);

      if (!this.editedTask.name) {
        this.editedTask = null;
      }

    });

  }

  setPriority(priority) {
    this.taskForm.controls['priority'].patchValue(priority);
  }

  saveTask() {

    if (!this.taskForm.valid) {
      return;
    }

    if (this.editedTask) {
      this.editedTask.name = this.taskForm.value.name;
      this.editedTask.priority = this.taskForm.value.priority;
      this.taskService.updateTask(this.editedTask);
      this.editedTask = null;
      this.taskService.selectedTaskSubject.next(new Task());
    } else {
      this.taskService.addNewTask(new Task(this.taskForm.value.name, this.taskForm.value.priority));
    }

    this.taskForm.reset();
    this.setPriority(1);
  }
}
