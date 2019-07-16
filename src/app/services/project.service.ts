import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public ApiUrl = 'http://localhost:64492/api';
  public ProjectApiUrl = 'http://localhost:64492/api/Projects';
  // public ApiUrl = 'http://localhost/BackEndAPI/api';
  // public ProjectApiUrl = 'http://localhost/BackEndAPI/api/Projects';

  constructor(private http:HttpClient) { }

  getProject():Observable<Project[]>
  {
    return this.http.get<Project[]>(this.ProjectApiUrl);
  }

  CreateProject(newproject:Project):Observable<Project[]>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<Project[]>(this.ProjectApiUrl,newproject,httpOptions)
  }

  DeleteProject(ProjectID:string):Observable<number>
  {
    return this.http.delete<number>(this.ProjectApiUrl+'/'+ProjectID);
  }

  getProjectById(ProjectID:string):Observable<Project>
  {
    return this.http.get<Project>(this.ProjectApiUrl+'/'+ProjectID);
  }

  UpdateProject(Project:Project):Observable<Project>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<Project>(this.ProjectApiUrl+'/'+Project.projectID,Project,httpOptions);
  }
}
