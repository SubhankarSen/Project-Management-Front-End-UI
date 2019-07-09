import { User } from './user';
import { Usertask } from './usertask';
import { Usertasklist } from './usertasklist';

export class Project 
{
  public user:User;
  public userTasks:Usertasklist[];
  public projectID: string;
  public projectDesc: string;
  public projStartDate: Date;
  public projEndDate: Date;
  public projPriority: string;
  public userID: string;
  public userTaskCount: number;
  public userTaskCompletedCount: number;
}
