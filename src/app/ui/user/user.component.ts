import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {NgForm,FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSaved = false;
  message:string;
  FromUser:FormGroup;
  UserID:string = "0";
  allUser:Observable<User[]>;
  addupdatebutton: string = "Add User";

  constructor(private formbuilder:FormBuilder,private UserService:UserService) { }

  GetUser()
  {
    debugger;
    this.allUser = this.UserService.getUser();
  }

  Reset()
  {
    this.FromUser.reset();
  }

  /* AddUser(User:User)
  {
    debugger;
    User.userID = this.UserID;
    this.UserService.CreateUser(User).subscribe(() => 
    {
        this.dataSaved = true;
        this.message = 'User saved Successfully';
        this.GetUser();
        this.Reset();
        this.UserID = "0";
      });
  } */
  AddUpdateUser(User:User)
  {
    debugger;
    if (this.UserID == "0" || null)
    {
      User.userID = this.UserID;
      this.UserService.CreateUser(User).subscribe(() => 
      {
          this.dataSaved = true;
          this.message = 'User saved Successfully';
          this.GetUser();
          this.Reset();
          this.UserID = "0";
      });
    }
    else
    {
      User.userID = this.UserID;
      this.UserService.UpdateUser(User).subscribe(() =>
      {
        this.dataSaved = true;
        this.message = 'User Update Succussfully';
        this.GetUser();
        this.Reset();
        this.UserID = "0";
      });
    }
  }

  DeleteUser(UserID:string)
  {
    if(confirm("Delete User?"))
    {
      this.UserService.DeleteUser(UserID).subscribe(() =>
      {
        this.dataSaved = true;
        this.message = 'User Deleted Successfully';
        this.GetUser();
      });
    }
  }

  UserEdit(UserID:string)
  {
    debugger;
    this.Reset();
    this.addupdatebutton = "Update User";
    this.UserService.getUserById(UserID).subscribe(Response =>
      {
        this.message = null;
        this.dataSaved = false;
        debugger;
        this.UserID = Response.userID;
        this.FromUser.controls['userFirstName'].setValue(Response.userFirstName);
        this.FromUser.controls['userLastName'].setValue(Response.userLastName);
        this.FromUser.controls['userEmployeeID'].setValue(Response.userEmployeeID);
      });
  }
    
  ngOnInit():void {

    this.FromUser = this.formbuilder.group(
      {
        userID: ['',[Validators.required]],
        userFirstName: ['',[Validators.required]],
        userLastName: ['',[Validators.required]],
        userEmployeeID: ['',[Validators.required]]
      });
      this.GetUser();
      this.addupdatebutton = "Add User";
  }
}
