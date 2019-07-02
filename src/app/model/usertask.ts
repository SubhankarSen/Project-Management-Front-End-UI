import { Project } from './project';
import { Parenttask } from './parenttask';
import { User } from './user';

export class Usertask 
{
    parenttask:Parenttask;
    project:Project;
    user:User;
    userTaskID: string;
    userTaskDesc: string;
    userTaskStartDate: Date;
    userTaskEndDate: Date;
    userTaskPriority: number;
    userTaskStatus: boolean;
    projectID: string;
    parentTaskID: string;
    userID: string;
    

    // projectID: number;
    // projectDesc: string;
    
    // parentTaskID: number;
    // parentTaskDesc: string;
    
    // userID: number;
    // userFirstName: string;
    // userLastName: string;
}
