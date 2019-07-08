import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usertask } from 'src/app/model/usertask';
import { Usertasklist } from 'src/app/model/usertasklist';
import { ProjectService } from 'src/app/services/project.service';
import { UsertaskService } from 'src/app/services/usertask.service';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/model/project';
import { Observable } from 'rxjs';
import { Parenttask } from 'src/app/model/parenttask';
import { Router, ActivatedRoute } from '@angular/router';

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
  // FromViewtask:FormGroup;
  FromViewtask = this.formbuilder.group(
    {
      projectID: ['',[Validators.required]],
    });


  constructor(
    private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UsertaskService:UsertaskService,
    private datePipe:DatePipe,
    private router:Router
  ) { }

  GetUsertask()
  {
    debugger;
    this.UsertaskService.getUsertask().subscribe((u)=>
    {
      this.allUsertask=u;
      this.allUsertask.forEach(userTask => 
        {
          if(userTask.parentTaskID = null)
          {
            userTask.parentTask.parentTaskDesc = " ";
          }
        });
    });
    // this.allUsertask = this.UsertaskService.getUsertask();
    console.log(this.allUsertask);
  }

  GetProject(p:any)
  {
    this.ProjectService.getProject().subscribe((p)=>{this.allProject=p;});
    console.log(this.allProject);
  }

  // GetProject(ProjectID:string)
  // {
  //   this.ProjectService.getProjectById(ProjectID).subscribe((p)=>{this.Project=p;});
  // }

  get projectID()
  {
    this.ProjectID = this.FromViewtask.get('projectID');
    return this.ProjectID;
    // this.GetProjectByID(this.ProjectID);

    // console.log(this.ProjectID);
    // this.ProjectService.getProjectById(this.ProjectID).subscribe((p)=>{this.Project=p;});
    // console.log(this.ProjectID);
    // this.allUsertask = Project.usertask;
    // console.log(this.allUsertask);
    // return this.ProjectID
  }

  GetProjectByID(ProjectID)
  {
    console.log(ProjectID);
    this.ProjectService.getProjectById(ProjectID).subscribe((p)=>
    {
      this.Project=p;
      this.allUsertasklist = p.userTasks;
      this.allUsertasklist.forEach(userTask => 
        {
          if(userTask.parentTaskID = null)
          {
            userTask.parentTask.parentTaskDesc = " ";
          }
        });
    });
    console.log(this.Project);
    console.log(this.allUsertasklist);
    // this.ProjectService.getProjectById(ProjectID).subscribe((p)=>{
    //   this.ProjectID = p.projectID;
    // });

    // this.allUsertasklist = this.Project.userTasks;
    // // console.log(this.allUsertasklist);
    // console.log(this.Project.userTasks);
    // // this.allUsertask = this.allUsertasklist;
  }

  Reset()
  {
    this.FromViewtask.reset();
  }

  EndUsertask(UsertaskID:string)
  {
    this.UsertaskService.getUsertaskById(UsertaskID).subscribe(Usertask =>
      {
        debugger;
        // UsertaskID = u.userTaskID;
        Usertask.userTaskStatus = false;
        this.UsertaskService.UpdateUsertask(Usertask).subscribe(() => {});
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
}
