import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usertask } from 'src/app/model/usertask';
import { ProjectService } from 'src/app/services/project.service';
import { UsertaskService } from 'src/app/services/usertask.service';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/model/project';
import { Observable } from 'rxjs';
import { Parenttask } from 'src/app/model/parenttask';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  allProject: Project[];
  allUsertask: Observable<Usertask[]>;
  ProjectID: any = "0";
  Project: Project;
  Usertask:Usertask;
  // FromViewtask:FormGroup;
  FromViewtask = this.formbuilder.group(
    {
      projectID: ['',[Validators.required]],
    });


  constructor(
    private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UsertaskService:UsertaskService,
    private datePipe:DatePipe
  ) { }

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

  GetUsertask()
  {
    debugger;
    this.allUsertask = this.UsertaskService.getUsertask();
    console.log();
  }

  GetProject(p:any)
  {
    this.ProjectService.getProject().subscribe((p)=>{this.allProject=p;});
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
    this.ProjectService.getProjectById(ProjectID).subscribe((p)=>{this.Project=p;});
    // this.ProjectService.getProjectById(ProjectID).subscribe((p)=>{
    //   this.ProjectID = p.projectID;
    // });
    this.allUsertask = Project.usertask;
  }

  Reset()
  {
    this.FromViewtask.reset();
  }
  
}
