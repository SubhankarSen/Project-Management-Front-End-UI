import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parenttask } from '../model/parenttask';

@Injectable({
  providedIn: 'root'
})
export class ParenttaskService {

  // public ApiUrl = 'http://localhost:64492/api';
  // public ParenttaskApiUrl = 'http://localhost:64492/api/ParentTasks';
  public ApiUrl = 'http://localhost/BackEndAPI/api';
  public ParenttaskApiUrl = 'http://localhost/BackEndAPI/api/ParentTasks';

  constructor(private http:HttpClient) { }

  getParenttask():Observable<Parenttask[]>
  {
    return this.http.get<Parenttask[]>(this.ParenttaskApiUrl);
  }

  CreateParenttask(parenttask:Parenttask):Observable<Parenttask[]>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<Parenttask[]>(this.ParenttaskApiUrl,parenttask,httpOptions)
  }

  DeleteParenttask(parentTaskID:string):Observable<number>
  {
    return this.http.delete<number>(this.ParenttaskApiUrl+'/'+parentTaskID);
  }

  getParenttaskById(parentTaskID:string):Observable<Parenttask>
  {
    return this.http.get<Parenttask>(this.ParenttaskApiUrl+'/'+parentTaskID);
  }

  UpdateParenttask(parentTask:Parenttask):Observable<Parenttask>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<Parenttask>(this.ParenttaskApiUrl+'/'+parentTask.parentTaskID,parentTask,httpOptions);
  }
}
