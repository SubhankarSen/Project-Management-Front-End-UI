import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './ui/user/user.component';
import { ProjectComponent } from './ui/project/project.component';
import { UsertaskComponent } from './ui/usertask/usertask.component';
import { ViewtaskComponent } from './ui/viewtask/viewtask.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'project', component: ProjectComponent },
    { path: 'user', component: UserComponent },
    { path: 'usertask', component: UsertaskComponent },
    // { path: 'usertask', redirectTo: 'usertask/' },
    // { path: 'usertask/:id', component: UsertaskComponent },
    { path: 'viewtask', component: ViewtaskComponent },
    { path: '', redirectTo: '/project', pathMatch: 'full' }
      ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
