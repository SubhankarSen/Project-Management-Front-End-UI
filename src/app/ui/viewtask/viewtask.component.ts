import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertask } from 'src/app/model/usertask';
import { Usertasklist } from 'src/app/model/usertasklist';
import { ProjectService } from 'src/app/services/project.service';
import { UsertaskService } from 'src/app/services/usertask.service';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/model/project';
import { Observable } from 'rxjs';
import { Parenttask } from 'src/app/model/parenttask';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  allProject: Project[];
  allUsertask: Usertask[];
  allUsertasklist: Usertasklist[];
  ProjectID: any = "0";
  Project: Project;
  Usertask: Usertask;
  Usertasklist: Usertasklist;
  Parenttask:Parenttask;
  UserTaskDesc: string;
  FromViewtask = this.formbuilder.group(
    {
      projectID: ['',[Validators.required]],
    });
  sortingName: string;
  isDesc: boolean;


  constructor(
    private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UsertaskService:UsertaskService,
    private datePipe:DatePipe,
    private router:Router,
    private orderPipe: OrderPipe
  ) { }

  GetUsertask()
  {
    debugger;
    this.UsertaskService.getUsertask().subscribe((u)=>
    {
      this.allUsertask=u;
    });
    console.log(this.allUsertask);
  }

  GetProject(p:any)
  {
    this.ProjectService.getProject().subscribe((p)=>{this.allProject=p;});
    console.log(this.allProject);
  }

  get projectID()
  {
    this.ProjectID = this.FromViewtask.get('projectID');
    return this.ProjectID;
  }

  GetProjectByID(ProjectID)
  {
    console.log(ProjectID);
    this.ProjectService.getProjectById(ProjectID).subscribe((p)=>
    {
      this.Project=p;
      this.allUsertasklist = p.userTasks;
    });
    console.log(this.Project);
    console.log(this.allUsertasklist);
  }

  Reset()
  {
    this.FromViewtask.reset();
  }

  EndUsertask(UsertaskID:string)
  {
    this.UsertaskService.getUsertaskById(UsertaskID).subscribe(u =>
      {
        this.Usertask = u;
        debugger;
        if (this.Usertask.userTaskStatus == false)
        {
          alert("Task is already Inactive. Task cannot be Ended");
          return;
        }
        this.Usertask.userTaskStatus = false;
        this.UsertaskService.UpdateUsertask(this.Usertask).subscribe(() => {});
      });
  }

  UsertaskEdit(UsertaskID:string)
  {
      this.router.navigate(["usertask",{UsertaskID: UsertaskID}]);
  }

  ngOnInit()
  {
    this.FromViewtask = this.formbuilder.group(
      {
        projectID: ['',[Validators.required]],
      });
    debugger;
    this.Reset();
    this.GetUsertask();
    console.log();
  }
  
  sort(name: string): void {
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }
}
