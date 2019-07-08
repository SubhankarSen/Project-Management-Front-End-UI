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

    // GetProject()
    // {
    //   debugger;
    //   this.allProject = this.ProjectService.getProject();
    // }

    // GetUser()
    // {
    //   debugger;
    //   this.allUser = this.UserService.getUser();
    // }

    GetUsertask(t:any)
    {
      debugger;
      // this.allUsertask = this.UsertaskService.getUsertask();
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
      if (this.UsertaskID == "0" || null || ' ')
      {
        Usertask.userTaskID = this.UsertaskID;
        Usertask.userTaskStatus = true;
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
          this.FromUsertask.controls['projectID'].setValue(Response.projectID);
          this.FromUsertask.controls['usertaskDesc'].setValue(Response.userTaskDesc);
          this.FromUsertask.controls['userTaskPriority'].setValue(Response.userTaskPriority);
          this.FromUsertask.controls['parentTaskID'].setValue(Response.parentTaskID);
          this.FromUsertask.controls['userTaskStartDate'].setValue(Response.userTaskStartDate);
          this.FromUsertask.controls['userTaskEndDate'].setValue(Response.userTaskEndDate);
          this.FromUsertask.controls['userID'].setValue(Response.userID);
          // this.FromProject.controls['userLastName'].setValue(Response.user.userLastName);
          // this.FromProject.controls['userEmployeeID'].setValue(Response.userEmployeeID);
        });
    }

    GetUser(u:any)
    {
      console.log(u.value);
      // this.allUser = this.UserService.getUser();
      this.UserService.getUser().subscribe((u)=>{this.allUser=u;});
      // this.userID.setValue(e.target.value,{onlySelf:true})
    }
  
    get userID()
    {
      return this.FromUsertask.get('userID');
    }

    GetProject(p:any)
    {
      console.log(p.value);
      // this.allUser = this.UserService.getUser();
      this.ProjectService.getProject().subscribe((p)=>{this.allProject=p;});
      // this.userID.setValue(e.target.value,{onlySelf:true})
    }

    get ProjectID()
    {
      return this.FromUsertask.get('projectID');
    }

  // GetUsertask(e:any)
  // {
  //   console.log(e.value);
  //   this.ParenttaskService.getParenttask().subscribe((t)=>{this.allParenttask=t;});
  // }

  ngOnInit() {

    this.FromUsertask = this.formbuilder.group(
      {
        userTaskID: ['',[Validators.required]],
        // userTaskStatus: ['',[Validators.required]],
        userTaskDesc: ['',[Validators.required]],
        userTaskStartDate: ['',[Validators.required]],
        userTaskEndDate: ['',[Validators.required]],
        userTaskPriority: ['',[Validators.required]],
        parentTaskID: ['',[Validators.required]],
        projectID: ['',[Validators.required]],
        userID: ['',[Validators.required]],
      });
      // this.GetUsertask();
      // this.GetUser();
      this.todayDate = new Date();
      this.tomorrowDate = new Date();
      this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);

      // this.Viewtaskparam = this.Activatedroute.paramMap.subscribe(params => {
      //   debugger;
      //   console.log(params);
      //   this.UsertaskID = params.get("id");
      //   this.UsertaskEdit(this.UsertaskID);
      // });
      // this.UsertaskID = this.Activatedroute.snapshot.paramMap.get("userTaskID");
      this.Activatedroute.params.subscribe( params => 
        {
          console.log(params);
          if (params["userTaskID"])
          {
           this.addupdatebutton = "Update Task";
           this.UsertaskEdit(params['userTaskID'])
          }
        });
      // this.UsertaskEdit(this.UsertaskID);
  }

}
