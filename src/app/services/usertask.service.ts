import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usertask } from '../model/usertask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsertaskService {

  public ApiUrl = 'http://localhost:64492/api';
  public UsertaskApiUrl = 'http://localhost:64492/api/Usertasks';

  constructor(private http:HttpClient) { }

  getUsertask():Observable<Usertask[]>
  {
    return this.http.get<Usertask[]>(this.UsertaskApiUrl);
  }

  CreateUsertask(newusertask:Usertask):Observable<Usertask[]>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<Usertask[]>(this.UsertaskApiUrl,newusertask,httpOptions)
  }

  DeleteUsertask(UserTaskID:string):Observable<number>
  {
    return this.http.delete<number>(this.UsertaskApiUrl+'/'+UserTaskID);
  }

  getUsertaskById(UserTaskID:string):Observable<Usertask>
  {
    return this.http.get<Usertask>(this.UsertaskApiUrl+'/'+UserTaskID);
  }

  UpdateUsertask(Usertask:Usertask):Observable<Usertask>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<Usertask>(this.UsertaskApiUrl+'/'+Usertask.userTaskID,Usertask,httpOptions);
  }
}
