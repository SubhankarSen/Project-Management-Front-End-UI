import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  dataSaved = false;
  message:string;
  // FromProject:FormGroup;
  ProjectID:string = "0";
  allProject:Observable<Project[]>;
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


  constructor
  (private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UserService:UserService,
    private datePipe:DatePipe
    // dataSaved = false;
  // message:string;
  /* FromProject:FormGroup,
  ProjectID:string = "0",
  allProject:Observable<Project[]>,
  allUser:Observable<User[]> */
    ) { }
  
  GetProject()
  {
    debugger;
    this.allProject = this.ProjectService.getProject();
  }

  Reset()
  {
    this.FromProject.reset();
    this.showDropDown = false;
  }

  AddUpdateProject(Project:Project)
  {
    debugger;
    if (this.ProjectID == "0" || null)
    {
      Project.projectID = this.ProjectID;
      this.ProjectService.CreateProject(Project).subscribe(() => 
      {
          this.dataSaved = true;
          console.log(Project);
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
        // this.FromProject.controls['userLastName'].setValue(Response.user.userLastName);
        // this.FromProject.controls['userEmployeeID'].setValue(Response.userEmployeeID);
      });
  }

  setDate(e)
  {
    this.setdate = e.target.checked;
    if (this.setdate == true)
    {
      this.project.projStartDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
      this.project.projEndDate = this.datePipe.transform(this.tomorrowDate, 'yyyy-MM-dd');
      // alert('button checked');
    }
    else
    {
      this.project.projStartDate = '';
      this.project.projEndDate = '';
      // alert('button unchecked');
    }
  }

  ngOnInit() 
  {
    /* this.FromProject = this.formbuilder.group(
      {
        projectID: ['',[Validators.required]],
        projectDesc: ['',[Validators.required]],
        projStartDate: ['',[Validators.required]],
        projEndDate: ['',[Validators.required]],
        projPriority: ['',[Validators.required]],
        userID: ['',[Validators.required]],
      }); */
      this.Reset();
      this.GetProject();
      // this.GetUser();
      this.todayDate = new Date();
      this.tomorrowDate = new Date();
      this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
      this.addupdatebutton = "Add Project";
  }

  GetUser(e:any)
  {
    console.log(e.value);
    // this.allUser = this.UserService.getUser();
    this.UserService.getUser().subscribe((u)=>{this.allUser=u;});
    // this.userID.setValue(e.target.value,{onlySelf:true})
  }

  get userID()
  {
    return this.FromProject.get('userID');
  }

  // onKeyDownAction(e):void
  // {
  //   this.showDropDown=true;
  //   this.allUser = this.UserService.getUser();
  //   this.userID = this.allUser[this.user.userID][this.user.userFirstName][this.user.userLastName];
  // }

  // toggledropdown():void
  // {
  //   this.showDropDown = !this.showDropDown;
  // }

  // GetUser(value)
  // {
  //   this.userID = [];
  //   if(value > 0)
  //   {
  //     this.userID = this.User.transform(this.)
  //   }
  // }
}
