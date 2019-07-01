import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Usertask } from 'src/app/model/usertask';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { UsertaskService } from 'src/app/services/usertask.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.css']
})
export class UsertaskComponent implements OnInit {
  allProject: any;
  allUser: any;
  allUsertask: any;
  FromUsertask: FormGroup;
  addupdatebutton: string = "Add Task";
  UsertaskID: string = "0";
  dataSaved: boolean;
  message: string;
  todayDate: Date;
  tomorrowDate: Date;



  constructor(
    private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UserService:UserService,
    private UsertaskService:UsertaskService,
    private datePipe:DatePipe) { }

    GetProject()
    {
      debugger;
      this.allProject = this.ProjectService.getProject();
    }

    GetUser()
    {
      debugger;
      this.allUser = this.UserService.getUser();
    }

    GetParenttask()
    {
      debugger;
      this.allUsertask = this.UsertaskService.getUsertask();
    }
  
    Reset()
    {
      this.FromUsertask.reset();
    }
  
    AddUpdateUsertask(Usertask:Usertask)
    {
      debugger;
      if (this.UsertaskID == "0" || null)
      {
        Usertask.userTaskID = this.UsertaskID;
        this.UsertaskService.CreateUsertask(Usertask).subscribe(() => 
        {
            this.dataSaved = true;
            this.message = 'Task saved Successfully';
            // this.GetProject();
            this.Reset();
            this.UsertaskID = "0";
        });
      }
      else
      {
        Usertask.userTaskID = this.UsertaskID;
        this.UsertaskService.UpdateUsertask(Usertask).subscribe(() =>
        {
          this.dataSaved = true;
          this.message = 'Task Update Succussfully';
          // this.GetProject();
          this.Reset();
          this.UsertaskID = "0";
        });
      }
    }
  
    DeleteUsertask(UsertaskID:string)
    {
      if(confirm("Delete Task?"))
      {
        this.UsertaskService.DeleteUsertask(UsertaskID).subscribe(() =>
        {
          this.dataSaved = true;
          this.message = 'Task Deleted Successfully';
          // this.GetProject();
        });
      }
    }
  
    UsertaskEdit(UsertaskID:string)
    {
      debugger;
      this.Reset();
      this.addupdatebutton = "Update Task";
      this.UsertaskService.getUsertaskById(UsertaskID).subscribe(Response =>
        {
          this.message = null;
          this.dataSaved = false;
          debugger;
          this.UsertaskID = Response.userTaskID;
          this.FromUsertask.controls['userTaskID'].setValue(Response.userTaskID);
          // this.FromProject.controls['userLastName'].setValue(Response.user.userLastName);
          // this.FromProject.controls['userEmployeeID'].setValue(Response.userEmployeeID);
        });
    }
  
  ngOnInit() {

    this.FromUsertask = this.formbuilder.group(
      {
        userTaskID: ['',[Validators.required]],
        UserTaskDesc: ['',[Validators.required]],
        userTaskStartDate: ['',[Validators.required]],
        userTaskEndDate: ['',[Validators.required]],
        userTaskPriority: ['',[Validators.required]],
        projectID: ['',[Validators.required]],
        userID: ['',[Validators.required]],
      });
      this.GetProject();
      // this.GetUser();
      this.todayDate = new Date();
      this.tomorrowDate = new Date();
      this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
  }

}
