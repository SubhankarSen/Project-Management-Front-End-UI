import { Parenttask } from './parenttask';
import { User } from './user';

export class Usertasklist 
{
    public parentTask:Parenttask;
    public user:User;
    public userTaskID: string;
    public userTaskDesc: string;
    public userTaskStartDate: Date;
    public userTaskEndDate: Date;
    public userTaskPriority: number;
    public userTaskStatus: boolean;
    public projectID: string;
    public parentTaskID: string;
    public userID: string;
}
