import { BusinessArea } from "./BusinessArea";
import { ClientSize } from "./ClientSize";
import { ClientType } from "./ClientType";
import { InviteEmail } from "./InviteEmail";
import { UserSK } from "./UserSK";
import { UserWorkspace } from "./UserWorkspace";
import { WorkspaceCreation } from "./WorkspaceCreation";
import { WorkspaceStatus } from "./WorkspaceStatus";

export interface Workspace {
  ID?: string;
  InvitedDate?: string
  DateAcceptedInvite?: string
  IsActive?: Boolean;
  InactivatedDate?: string;
  UserWorkspaceParameters?: string
  WorkspaceName?: string;
  WorkspaceURL?: string;
  CreatedByUser?: UserSK;
  SuperAdmin?: UserSK;
  UpdatedByUser?: UserSK;
  clientSize?: ClientSize;
  businessArea?: BusinessArea;
  workspaceCreation?: WorkspaceCreation;
  clientType?: ClientType;
  workspaceStatus?: WorkspaceStatus;
  userWorkspaces?: UserWorkspace[];
  invitesEmail?: InviteEmail[]
}
