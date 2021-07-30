import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';
import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { InputUserSKSave } from '../models/UserSK';
import { InputEnrollUserToWorkspaceSave, InputUpdateUserInWorkspace, InputUserWorkspaceSave } from '../models/UserWorkspaceSave';
import * as moment from 'moment';

interface CreateAccount {
  workSpaceName: string;
  workspaceURL: string;
  email?: string;
  userName?: string;
  password?:string;
  token?:string;
  profileCode: string;
  workSpaceStatusCode: string;
  clientTypeCode: string;
  clientSizeCode: string;
  businessAreaCode:string;
  invitesEmails: [string];
}

@Injectable()
export class UserService {
  userSk:User;
  userQuery = `
    ID
    UserName
    Email
    IsActive
    userWorkspaces {
      ID
      InviteStatus
      InvitedDate
      IsActive
      profile {
        ID
        Profile
      }
      workspace {
        ID
      }
    }
  `
  constructor(
    private apollo: Apollo
  ) {
  }

  getAllSizeWorkspace() {
    return this.apollo.query({
      query: gql`
        query {
          getAllClientSize {
            ID
            ClientSize
          }
        }
      `
    })
  }

  getAllClientTypeWorkspace() {
    return this.apollo.query({
      query: gql`
        query{
          getAllClientType{
            ID
            ClientType
          }
        }
      `
    })
  }

  getAllBusinessArea() {
    return this.apollo.query({
      query: gql`
        query{
          getAllBusinessArea {
            ID
            BusinessArea
          }
        }
      `
    })
  }

  getAllWorkspaceStatus() {
    return this.apollo.query({
      query: gql`
        query{
          getAllWorkspaceStatus {
            ID
            WorkspaceStatus
            TagControl
          }
        }
      `
    })
  }

  runUpdateUserSK(variables:any){
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $input:InputUserSKUpdate!,
          $id:ID!
        ){
          updateUserSK(input:$input, id:$id){
            ID
            UserName
            IsActive
          }
        }
      `,
      variables
    })
  }

  runUpdateUserInWorkspace(variables:any){
    return this.apollo.mutate({
      mutation: gql`
      mutation($input:InputUpdateUserInWorkspace!, $id:ID!){
        updateUserInWorkspace(input:$input, id:$id)
      }
      `,
      variables
    })
  }

  changeUserSKStatus(newIsActive:boolean, userSkID:string){
    return this.runUpdateUserSK({
        input: {
          IsActive: newIsActive
        },
        id:userSkID
      },
    );
  }

  changeUserWorkspaceStatus(newIsActive:boolean, userWorkspaceId:string){
    return this.runUpdateUserInWorkspace({
        input: {
          UserWorkspaceUpdate: {
            IsActive: newIsActive
          }
        },
        id: userWorkspaceId
      },
    );
  }
  updateUserInWorkspace(input:InputUpdateUserInWorkspace, userWorkspaceId:string ){
    return this.runUpdateUserInWorkspace({
        input,
        id: userWorkspaceId
      },
    );
  }
  createAccount(data: CreateAccount) {
    return this.apollo.mutate({
      mutation: gql`
      mutation(
        $workSpaceName: String,
        $workspaceURL: String,
        $email: String!,
        $userName: String!,
        $password: String,
        $profileCode: ID!,
        $workSpaceStatusCode: ID!,
        $clientTypeCode: ID!,
        $clientSizeCode: ID!,
        $businessAreaCode: ID!,
        $invitesEmails: [String!]
      ) {
        createAccount(input: {
          Workspace: {
            WorkspaceName: $workSpaceName,
            WorkspaceURL: $workspaceURL,
            InvitedDate: "${new Date().toDateString()}"
            DateAcceptedInvite: "${new Date().toDateString()}",
          },
          UserSK: {
            Email: $email,
            UserName: $userName,
            IsActive: true,
            ShowGetStarted: false
          },
          UserWorkSpace: {
            InvitedDate:  "${new Date().toDateString()}",
            DateAcceptedInvite:  "${new Date().toDateString()}",
          },
          Authenticate: {
            AuthenticationType: PASSWORD,
            Password: $password,
          },
          InvitesEmail: $invitesEmails,
          ProfileCode: $profileCode,
          workspacestatuscode:  $workSpaceStatusCode,
          clienttypecode: $clientTypeCode,
          clientsizecode: $clientSizeCode,
          businessareacode: $businessAreaCode,
        }) {
          ID
        }
      }
      `,variables: {
        workSpaceName: data.workSpaceName,
        workspaceURL: data.workspaceURL,
        email: data.email,
        userName: data.userName,
        password: data.password,
        profileCode: data.profileCode,
        workSpaceStatusCode: data.workSpaceStatusCode,
        clientTypeCode: data.clientTypeCode,
        clientSizeCode: data.clientSizeCode,
        businessAreaCode: data.businessAreaCode,
        invitesEmails: data.invitesEmails
      }
    })
  }

  createUserSK(data:InputUserSKSave) {
    return this.apollo.mutate({
      mutation: gql`
      mutation($input: InputUserSKSave!){
        createUserSK(input:$input){
          ID
          Email
          UserName
        }
      }
      `,
      variables:{
        input: data
      }
    })
  }

  createUserWorkspace(data:InputUserWorkspaceSave){
    return this.apollo.mutate({
      mutation: gql`
      mutation($input: InputUserWorkspaceSave!){
        createUserWorkspace(input:$input){
          userSK {
            ID
            UserName
          }
          workspace {
            ID
            WorkspaceName
          }
        }
      }
      `,
      variables:{
        input: data
      }
    })
  }

  enrollUserToWorkspace(data: InputEnrollUserToWorkspaceSave){
    return this.apollo.mutate({
      mutation: gql`
        mutation($input:InputEnrollUserToWorkspaceSave!){
          enrollUserToWorkspace(input:$input){
            ID
            InvitedDate
            userSK {
              ID
              UserName
            }
            profile {
              ID
              Profile
            }
            workspace {
              ID
              WorkspaceName
            }
          }
        }
      `,
      variables:{
        input: data
      }
    });
  }
  tryCreateAccountStageOne(authenticationType, emailCreator) {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $authenticationType: String,
          $emailCreator: String
        ) {
          createWorkspaceCreation(input: {
            AuthenticationType: $authenticationType,
            CreationStartDate: "${new Date().toDateString()}",
            ReadPrivacyStatementDate: "${new Date().toDateString()}"
            CreationFinishDate: "${new Date().toDateString()}",
            EmailCreator: $emailCreator
          }) {
            ID
          }
        }
      `,variables: {
        authenticationType, emailCreator
      }
    })
  }

  tryCreateAccountStageSecond(
    authenticationType,
    emailCreator,
    workspaceName,
    workspaceURL,
    usernameCreator,
    password,
    clientsizecode
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $authenticationType: String,
          $emailCreator: String,
          $workspaceName: String,
          $workspaceURL: String,
          $usernameCreator: String,
          $password: String,
          $clientsizecode: ID,
        ) {
          createWorkspaceCreation(input: {
            AuthenticationType: $authenticationType,
            CreationStartDate: "${new Date().toDateString()}",
            ReadPrivacyStatementDate: "${new Date().toDateString()}"
            CreationFinishDate: "${new Date().toDateString()}",
            EmailCreator: $emailCreator,
            WorkspaceName: $workspaceName,
            WorkspaceURL: $workspaceURL,
            UsernameCreator: $usernameCreator,
            Password: $password,
            clientsizecode: $clientsizecode
          }) {
            ID
          }
        }
      `,variables: {
        authenticationType,
        emailCreator,
        workspaceName,
        workspaceURL,
        usernameCreator,
        password,
        clientsizecode
      }
    })
  }

  tryCreateAccountStageSecondSocialMedia(
    authenticationType,
    emailCreator,
    workspaceName,
    workspaceURL,
    usernameCreator,
    password,
    workspacecreationcode,
    clientsizecode
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $authenticationType: String,
          $emailCreator: String,
          $workspaceName: String,
          $workspaceURL: String,
          $usernameCreator: String,
          $password: String,
          $clientsizecode: ID,
          $workspacecreationcode: ID
        ) {
          createWorkspaceCreation(input: {
            AuthenticationType: $authenticationType,
            CreationStartDate: "${new Date().toDateString()}",
            ReadPrivacyStatementDate: "${new Date().toDateString()}"
            CreationFinishDate: "${new Date().toDateString()}",
            EmailCreator: $emailCreator,
            WorkspaceName: $workspaceName,
            WorkspaceURL: $workspaceURL,
            UsernameCreator: $usernameCreator,
            Password: $password,
            clientsizecode: $clientsizecode
            workspacecreationcode: $workspacecreationcode
          }) {
            ID
          }
        }
      `,variables: {
        authenticationType,
        emailCreator,
        workspaceName,
        workspaceURL,
        usernameCreator,
        password,
        workspacecreationcode,
        clientsizecode
      }
    })
  }

  tryCreateAccountStageThird(
    authenticationType,
    emailCreator,
    workspaceName,
    workspaceURL,
    usernameCreator,
    password,
    clienttypecode,
    clientsizecode,
    businesscode,
    email1,
    email2,
    email3,
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $authenticationType: String,
          $emailCreator: String,
          $workspaceName: String,
          $workspaceURL: String,
          $usernameCreator: String,
          $password: String,
          $email1: String,
          $email2: String,
          $email3: String,
          $businesscode: ID,
          $clientsizecode: ID,
          $clienttypecode: ID,
        ) {
          createWorkspaceCreation(input: {
            AuthenticationType: $authenticationType,
            CreationStartDate: "${new Date().toDateString()}",
            ReadPrivacyStatementDate: "${new Date().toDateString()}"
            CreationFinishDate: "${new Date().toDateString()}",
            EmailCreator: $emailCreator,
            WorkspaceName: $workspaceName,
            WorkspaceURL: $workspaceURL,
            UsernameCreator: $usernameCreator,
            Password: $password,
            clientsizecode: $clientsizecode,
            clienttypecode: $clienttypecode,
            EmailInvite1: $email1,
            EmailInvite2: $email2,
            EmailInvite3: $email3,
            businessareacode: $businesscode,
          }) {
            ID
          }
        }
      `,variables: {
        authenticationType,
        emailCreator,
        workspaceName,
        workspaceURL,
        usernameCreator,
        password,
        clienttypecode,
        clientsizecode,
        email1,
        email2,
        email3,
        businesscode,
      }
    })
  }

  getUserLogged(userId) {
    return this.apollo.query({
      query: gql`
        query ($id: ID!){
          getUserSK(id: $id ){
            ${this.userQuery}
          }
        }
      `, variables: {
        id: userId
      }
    })
  }
  getUserSK(userSKId) {
    return this.apollo.query({
      query: gql`
        query ($id: ID!){
          getUserSK(id: $id ){
            ${this.userQuery}
          }
        }
      `, variables: {
        id: userSKId
      }
    })
  }

  getAllUserSKByWorkspaceId(workspaceId:string) {
    return this.apollo.query({
      query: gql`
      query($id:ID!) {
        getAllUserSKByWorkspaceId(workspaceId:$id) {
          ${this.userQuery}
        }
      }
      `, variables: {
        id: workspaceId
      }
    }).toPromise();
  }


  requestResetPassword(email) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($email: String!){
          resetPassword(email: $email)
        }
      `, variables: {
        email
      }
    })
  }

  changePassword(password, confirmPassword, token) {
    return this.apollo.mutate({
      mutation: gql`
      mutation(
        $password: String!,
        $confirmPassword: String!,
        $token: String!
      ) {
        updatePasswordRecovery(
          password: $password,
          confirmPassword: $confirmPassword,
          token: $token
        )
      }
      `, variables: {
        password,
        confirmPassword,
        token
      }
    })
  }

  createAccountSocialMedia(data: CreateAccount) {
    return this.apollo.mutate({
      mutation: gql`
      mutation(
        $userName: String!,
        $workSpaceName: String,
        $workspaceURL: String,
        $federationToken: String,
        $profileCode: ID!,
        $workSpaceStatusCode: ID!,
        $clientTypeCode: ID!,
        $clientSizeCode: ID!,
        $businessAreaCode: ID!,
        $invitesEmails: [String!]
      ) {
        createAccount(input: {
          Workspace: {
            WorkspaceName: $workSpaceName,
            WorkspaceURL: $workspaceURL,
            InvitedDate: "${new Date().toDateString()}"
            DateAcceptedInvite: "${new Date().toDateString()}",
          },
          UserSK: {
            UserName: $userName,
            IsActive: true,
            ShowGetStarted: false
          },
          UserWorkSpace: {
            InvitedDate:  "${new Date().toDateString()}",
            DateAcceptedInvite:  "${new Date().toDateString()}",
          },
          Authenticate: {
            AuthenticationType: GOOGLE,
            FederationToken: $federationToken,
          },
          InvitesEmail: $invitesEmails,
          ProfileCode: $profileCode,
          workspacestatuscode:  $workSpaceStatusCode,
          clienttypecode: $clientTypeCode,
          clientsizecode: $clientSizeCode,
          businessareacode: $businessAreaCode,
        }) {
          ID
        }
      }
      `,variables: {
        userName: data.userName,
        workSpaceName: data.workSpaceName,
        workspaceURL: data.workspaceURL,
        federationToken: data.token,
        profileCode: data.profileCode,
        workSpaceStatusCode: data.workSpaceStatusCode,
        clientTypeCode: data.clientTypeCode,
        clientSizeCode: data.clientSizeCode,
        businessAreaCode: data.businessAreaCode,
        invitesEmails: data.invitesEmails
      }
    })
  }

  deleteUserWorkspace(userWorkspaceID:string){
    return this.apollo.mutate({
      mutation: gql`
        mutation($id:ID!){
          deleteUserWorkspace(id:$id)
        }
      `,
      variables:{
        id:userWorkspaceID
      }
    })
  }

  formatUser(user:any):User{

    const workspaceId = localStorage.getItem('workspaceId');
    const currentUserWorskpace = this.getCurrentUserWorkspace(user, workspaceId);

    const formatedUser: User = {
      ID:user.ID,
      Email: user.Email,
      Photo: user.Photo,
      profile: currentUserWorskpace.profile,
      UserName: user.UserName,
      currentUserWorkspaceID: currentUserWorskpace.ID,
      userWorkspaces: user.userWorkspaces,
      workspaces: this.getWorkspaces(user),
      IsActive:currentUserWorskpace.IsActive,
      // IsActive:user.IsActive,
      InviteStatus: currentUserWorskpace.InviteStatus,
      InvitedDate: moment(+currentUserWorskpace.InvitedDate).format('DD/MM/YYYY')
    }

    return formatedUser;
  }

  getWorkspaces(user){
    return user.userWorkspaces.map(({ workspace }) => {
      return {
        ID:workspace.ID,
        WorkspaceName: workspace.WorkspaceName
      }
    })
  }
  // getUserProfile(user:any, workspaceId:string):Profile{

  // }

  getCurrentUserWorkspace(user:any, workspaceId:string){
    return user.userWorkspaces.find(
      userWorkspace => userWorkspace.workspace.ID === workspaceId
    )
  }
}
