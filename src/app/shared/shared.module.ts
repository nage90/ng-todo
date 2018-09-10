import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SuiCheckboxModule, SuiSelectModule} from 'ng2-semantic-ui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocalizedDatePipe} from './pipes/localized-date-pipe';
import {ArraySortPipe} from './pipes/sort-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SuiSelectModule,
    SuiCheckboxModule,
    BrowserAnimationsModule,
    TranslateModule
  ],
  declarations: [
    LocalizedDatePipe,
    ArraySortPipe
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LocalizedDatePipe,
    ArraySortPipe,
    SuiSelectModule,
    SuiCheckboxModule
  ],
  entryComponents: [

  ]
})
export class SharedModule {
}
