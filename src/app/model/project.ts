import { User } from './user';
import { Usertask } from './usertask';

export class Project 
{
    user:User;
    usertask:Usertask[];
    projectID: string;
    project_Desc: string;
    projStart_Date: Date;
    projEnd_Date: Date;
    proj_Priority: string;
    userID: string;
    
    // userID: string;
    // projusertask:Usertask;
    // userTaskCount: number;
    // userTaskCompletedCount: number;
}
