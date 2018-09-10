import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TodoPageComponent} from './todo-page/todo-page.component';
import {TaskEditorComponent} from './todo-page/task-editor/task-editor.component';
import {TaskListComponent} from './todo-page/task-list/task-list.component';


const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '**',
    component: TodoPageComponent,
  },
  {
    path: 'todo',
    component: TodoPageComponent,
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    TodoPageComponent,
    TaskEditorComponent,
    TaskListComponent
  ],
  providers: []
})
export class HomeModule {
}
