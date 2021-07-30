import { Profile } from "./Profile";

export interface User {
  ID?:string;
  UserName:string;
  Email:string;
  profile:Profile;
  Photo?:string;
  currentUserWorkspaceID?:string;
  userWorkspaces:any[];
  workspaces:any[];
  IsActive:boolean;
  InviteStatus?: boolean;
  InvitedDate?:string;
}
