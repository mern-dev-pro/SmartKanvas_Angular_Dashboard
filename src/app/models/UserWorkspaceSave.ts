import { InputUserSKSave } from "./UserSK";

export interface InputUserWorkspaceSave {
  InvitedDate?: string;
  DateAcceptedInvite?: string;
  IsActive: boolean;
  InactivatedDate?: string
  ProfileCode: string;
  UserCode: string;
  WorkspaceCode: string;
}

export interface InputEnrollUserToWorkspaceSave{
  UserSK: InputUserSKSave;
  WorkspaceCode: string;
  ProfileCode: string;
}

export interface InputUserWorkspaceUpdate {
  InvitedDate?: string;
  DateAcceptedInvite?: string;
  IsActive?: boolean;
  InactivatedDate?: string;
  ProfileCode?: string;
}
export interface InputUpdateUserInWorkspace {
  UserName?:string;
  UserWorkspaceUpdate?: InputUserWorkspaceUpdate;
  Email?: string;
}
