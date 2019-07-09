import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Usertask } from 'src/app/model/usertask';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { UsertaskService } from 'src/app/services/usertask.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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
  allParenttask: any;
  Viewtaskparam: any;



  constructor(
    private formbuilder:FormBuilder,
    private ProjectService:ProjectService,
    private UserService:UserService,
    private UsertaskService:UsertaskService,
    private datePipe:DatePipe,
    private Activatedroute:ActivatedRoute,
    ) { }

    GetUsertask(t:any)
    {
      debugger;
      console.log(t.value);
      this.UsertaskService.getUsertask().subscribe((t)=>{this.allUsertask=t;});
    }

    get ParenttaskID()
    {
      return this.FromUsertask.get('parentTaskID');
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
        if ((Usertask.projectID == " " || null) || (Usertask.userTaskDesc == " " || null) || (Usertask.userTaskPriority == 0 || null) || (Usertask.userID == " " || null))
        {
          alert("Please Enter all the Task Details");
          return;
        }
        if (Usertask.userTaskStartDate >= Usertask.userTaskEndDate)
        {
          alert("Start Date cannot be greater or equal to End Date");
          return;
        }
        Usertask.userTaskStatus = true;
        this.UsertaskService.CreateUsertask(Usertask).subscribe(() => 
        {
            this.dataSaved = true;
            this.message = 'Task saved Successfully';
            this.Reset();
            this.UsertaskID = "0";
        });
      }
      else
      {
        Usertask.userTaskID = this.UsertaskID;
        if ((Usertask.projectID == " " || null) || (Usertask.userTaskDesc == " " || null) || (Usertask.userTaskPriority == 0 || null) || (Usertask.userID == " " || null))
        {
          alert("Please Enter all the Task Details");
          return;
        }
        if (Usertask.userTaskStartDate >= Usertask.userTaskEndDate)
        {
          alert("Start Date cannot be greater or equal to End Date");
          return;
        }
        this.UsertaskService.UpdateUsertask(Usertask).subscribe(() =>
        {
          this.dataSaved = true;
          this.message = 'Task Update Succussfully';
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
          if (Response.userTaskStatus == false)
        {
          alert("Task is already Inactive. Task cannot be Edited");
          return;
        }
          this.message = null;
          this.dataSaved = false;
          debugger;
          this.UsertaskID = Response.userTaskID;
          this.FromUsertask.controls['projectID'].setValue(Response.projectID);
          this.FromUsertask.controls['userTaskDesc'].setValue(Response.userTaskDesc);
          this.FromUsertask.controls['userTaskPriority'].setValue(Response.userTaskPriority);
          this.FromUsertask.controls['parentTaskID'].setValue(Response.parentTaskID);
          this.FromUsertask.controls['userTaskStartDate'].setValue(Response.userTaskStartDate);
          this.FromUsertask.controls['userTaskEndDate'].setValue(Response.userTaskEndDate);
          this.FromUsertask.controls['userID'].setValue(Response.userID);
        });
    }

    GetUser(u:any)
    {
      console.log(u.value);
      this.UserService.getUser().subscribe((u)=>{this.allUser=u;});
    }
  
    get userID()
    {
      return this.FromUsertask.get('userID');
    }

    GetProject(p:any)
    {
      console.log(p.value);
      this.ProjectService.getProject().subscribe((p)=>{this.allProject=p;});
    }

    get ProjectID()
    {
      return this.FromUsertask.get('projectID');
    }

  ngOnInit() {

    this.FromUsertask = this.formbuilder.group(
      {
        userTaskID: ['',[Validators.required]],
        userTaskDesc: ['',[Validators.required]],
        userTaskStartDate: ['',[Validators.required]],
        userTaskEndDate: ['',[Validators.required]],
        userTaskPriority: ['',[Validators.required]],
        parentTaskID: ['',[Validators.required]],
        projectID: ['',[Validators.required]],
        userID: ['',[Validators.required]],
      });

      this.todayDate = new Date();
      this.tomorrowDate = new Date();
      this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);

      this.Activatedroute.params.subscribe( params => 
        {
          console.log(params.UsertaskID);
          if (params.UsertaskID == null)
          {
            console.log(params);
          }
          else
          {
           this.addupdatebutton = "Update Task";
           this.UsertaskEdit(params.UsertaskID)
          }
        });
  }
}
