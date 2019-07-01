import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public ApiUrl = 'http://localhost:64492/api';
  public UserApiUrl = 'http://localhost:64492/api/Users';

  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>
  {
    return this.http.get<User[]>(this.UserApiUrl);
  }

  CreateUser(newuser:User):Observable<User[]>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<User[]>(this.UserApiUrl,newuser,httpOptions)
  }

  DeleteUser(userID:string):Observable<number>
  {
    return this.http.delete<number>(this.UserApiUrl+'/'+userID);
  }

  getUserById(userID:string):Observable<User>
  {
    return this.http.get<User>(this.UserApiUrl+'/'+userID);
  }

  UpdateUser(user:User):Observable<User>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<User>(this.UserApiUrl+'/'+user.userID,user,httpOptions);
  }
}
