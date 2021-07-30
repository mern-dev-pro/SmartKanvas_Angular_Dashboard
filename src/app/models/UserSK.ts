export interface UserSK {
  ID?:string;
  Email: string;
  UserName: string;
  IsActive: boolean;
  Photo?: string;
  ShowGetStarted:boolean;
  CreatedDate?:string;
  LastUpdate?:string;
  UserWorkspaceParameters?:string;
  workspaces?:any[];
  userWorkspaces?:any[];
}

export interface InputUserSKSave {
  Email: string;
  UserName: string;
  IsActive: boolean;
  Photo?: string;
  ShowGetStarted:boolean;
  UserWorkspaceParameters?:string;
}
