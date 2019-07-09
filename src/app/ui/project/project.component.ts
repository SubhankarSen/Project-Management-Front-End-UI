import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Usertasklist } from 'src/app/model/usertasklist';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  dataSaved = false;
  message:string;
  ProjectID:string = "0";
  allProject:Project[];
  allUser:User[];
  setdate = false;
  project:Project;
  user:User;
  todayDate: any;
  tomorrowDate: any;
  showDropDown = false;
  addupdatebutton: string = "Add Project";
  FromProject = this.formbuilder.group(
    {
      projectID: ['',[Validators.required]],
      projectDesc: ['',[Validators.required]],
      projStartDate: ['',[Validators.required]],
      projEndDate: ['',[Validators.required]],
      projPriority: ['',[Validators.required]],
      userID: ['',[Validators.required]],
    });
  UserTaskCount: number[];
  allUserTask: any;
  UserTaskComplete: number[];
  i: number = 0;
  j: number = 0;


  constructor
  (private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UserService:UserService,
    private datePipe:DatePipe
    ) { }
  
  GetProject()
  {
    debugger;
    this.ProjectService.getProject().subscribe((p) =>
    {
      this.allProject = p;
      this.allProject.forEach(Project => 
        {
          this.i = this.j = 0;
          Project.userTasks.forEach((Usertasklist) => 
            {
              this.i = this.i + 1;
              if (Usertasklist.userTaskStatus == false)
              {
                this.j = this.j + 1;
              }
            });
            Project.userTaskCount = this.i;
            console.log(Project.userTaskCount);
            Project.userTaskCompletedCount = this.j;
            console.log(Project.userTaskCompletedCount);
        });
    });
  }

  Reset()
  {
    this.FromProject.reset();
    this.showDropDown = false;
  }

  AddUpdateProject(Project:Project)
  {
    if ((Project.projectDesc = " " || null) || (Project.projPriority = " " || null) || (Project.userID = " " || null))
    {
      alert("Please enter project details");
      return;
    }
    if (Project.projStartDate >= Project.projEndDate){
      alert("Start Date cannot be greater than End Date");
      return;
    }
    debugger;
    if (this.ProjectID == "0" || null)
    {
      Project.projectID = this.ProjectID;
      this.ProjectService.CreateProject(Project).subscribe(() => 
      {
          this.dataSaved = true;
          console.log();
          this.message = 'Project saved Successfully';
          this.GetProject();
          this.Reset();
          this.ProjectID = "0";
      });
    }
    else
    {
      Project.projectID = this.ProjectID;
      this.ProjectService.UpdateProject(Project).subscribe(() =>
      {
        this.dataSaved = true;
        this.message = 'Project Update Succussfully';
        this.GetProject();
        this.Reset();
        this.ProjectID = "0";
      });
    }
  }

  DeleteProject(ProjectID:string)
  {
    if(confirm("Delete Project?"))
    {
      this.ProjectService.DeleteProject(ProjectID).subscribe(() =>
      {
        this.dataSaved = true;
        this.message = 'Project Deleted Successfully';
        this.GetProject();
      });
    }
  }

  ProjectEdit(ProjectID:string)
  {
    debugger;
    this.Reset();
    this.addupdatebutton = "Update Project";
    this.ProjectService.getProjectById(ProjectID).subscribe(Response =>
      {
        this.message = null;
        this.dataSaved = false;
        debugger;
        this.ProjectID = Response.projectID;
        this.FromProject.controls['projectDesc'].setValue(Response.projectDesc);
        this.FromProject.controls['projStartDate'].setValue(Response.projStartDate);
        this.FromProject.controls['projEndDate'].setValue(Response.projEndDate);
        this.FromProject.controls['projPriority'].setValue(Response.projPriority);
        this.FromProject.controls['userID'].setValue(Response.userID);
      });
  }

  ngOnInit() 
  {
      this.Reset();
      this.GetProject();
      this.todayDate = new Date();
      this.tomorrowDate = new Date();
      this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
      this.addupdatebutton = "Add Project";
  }

  GetUser(e:any)
  {
    console.log(e.value);
    this.UserService.getUser().subscribe((u)=>{this.allUser=u;});
  }

  get userID()
  {
    return this.FromProject.get('userID');
  }
}