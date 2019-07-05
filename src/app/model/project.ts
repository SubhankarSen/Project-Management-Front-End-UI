import { User } from './user';
import { Usertask } from './usertask';

export class Project 
{
    user:User;
    usertask:Usertask[];
    projectID: string;
    projectDesc: string;
    projStartDate: Date;
    projEndDate: Date;
    projPriority: string;
    userID: string;
  static usertask: any;
    
    // userID: string;
    // projusertask:Usertask;
    // userTaskCount: number;
    // userTaskCompletedCount: number;
}
