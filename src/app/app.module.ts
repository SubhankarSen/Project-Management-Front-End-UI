import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './ui/project/project.component';
import { UserComponent } from './ui/user/user.component';
import { UsertaskComponent } from './ui/usertask/usertask.component';
import { DatePipe } from '@angular/common';
import { ViewtaskComponent } from './ui/viewtask/viewtask.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    UserComponent,
    UsertaskComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
