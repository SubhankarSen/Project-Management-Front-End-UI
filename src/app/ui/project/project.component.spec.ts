import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { ProjectComponent } from './project.component';
import { UsertaskService } from 'src/app/services/usertask.service';
import { ParenttaskService } from 'src/app/services/parenttask.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Usertask } from 'src/app/model/usertask';
import { User } from 'src/app/model/user';
import { Parenttask } from 'src/app/model/parenttask';
import {BrowserModule,By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { DatePipe,APP_BASE_HREF } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {OrderModule} from 'ngx-order-pipe'
import { HttpClient, HttpHandler } from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UsertaskComponent } from '../usertask/usertask.component';
import { ViewtaskComponent } from '../viewtask/viewtask.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertaskComponent,ProjectComponent,UserComponent,ViewtaskComponent ],
      providers:[UsertaskService,ParenttaskService,UserService,ProjectService,DatePipe,
        {provide: APP_BASE_HREF, useValue : '/' }],
      imports:[OrderModule,BrowserModule,ReactiveFormsModule,HttpClientTestingModule,AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
