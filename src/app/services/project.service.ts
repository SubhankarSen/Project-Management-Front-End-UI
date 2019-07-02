import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { ProjectAdd } from '../model/project-add';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public ApiUrl = 'http://localhost:64492/api';
  public ProjectApiUrl = 'http://localhost:64492/api/Projects';

  constructor(private http:HttpClient) { }

  getProject():Observable<Project[]>
  {
    return this.http.get<Project[]>(this.ProjectApiUrl);
  }

  CreateProject(newproject:ProjectAdd):Observable<ProjectAdd[]>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<ProjectAdd[]>(this.ProjectApiUrl,newproject,httpOptions)
  }

  DeleteProject(ProjectID:string):Observable<number>
  {
    return this.http.delete<number>(this.ProjectApiUrl+'/'+ProjectID);
  }

  getProjectById(ProjectID:string):Observable<ProjectAdd>
  {
    return this.http.get<ProjectAdd>(this.ProjectApiUrl+'/'+ProjectID);
  }

  UpdateProject(Project:ProjectAdd):Observable<ProjectAdd>
  {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<ProjectAdd>(this.ProjectApiUrl+'/'+Project.projectID,Project,httpOptions);
  }
}
