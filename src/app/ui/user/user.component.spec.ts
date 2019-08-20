import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
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
import { UsertaskComponent } from '../usertask/usertask.component';
import { ViewtaskComponent } from '../viewtask/viewtask.component';
import { ProjectComponent } from '../project/project.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
