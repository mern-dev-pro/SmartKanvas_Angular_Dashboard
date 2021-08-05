import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import SKFilter from 'src/app/helpers/SKFilter';
import { DashboardFilterConfig } from 'src/app/models/DashboardFilterConfig';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import ICard from 'src/app/shared/components/card/ICard';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // filterActive = true;
  // filterInactive = true;
  // filterInvitePending = true;
  // filterAdmins = true;
  // filterTeamMembers = true;
  // filterViewer = true;
  cardUsers:ICard[];
  listType = 'grid';
  rowMode = 'Vertical';
  isMobile = this.deviceService.isMobile();
  dictionary:any;
  workspaceId:string;
  users: User[];
  data: User[];
  filteredUsers: User[];
  searchedUsers: User[];
  filtersConfig:DashboardFilterConfig[] = [
    {
      filter:'active',
      value: true,
      label: 'Ativos',
      filterCriteria: (element:User) => element.IsActive === true && element.InviteStatus === true
    },
    {
      filter:'inactive',
      value: true,
      label: 'Inativos',
      filterCriteria: (element:User) => element.IsActive === false
    },
    {
      filter:'pending',
      value: true,
      label: 'Com convite pendente',
      filterCriteria: (element:User) => element.InviteStatus === false
    },
    {
      filter:'admin',
      value: true,
      label: 'Administradores',
      filterCriteria: (element:User) => element.profile.Profile === 'Administrator'
    },
    {
      filter:'user',
      value: true,
      label: 'Membros da Equipe',
      filterCriteria: (element:User) => element.profile.Profile === 'User'
    },
    {
      filter:'guest',
      value: true,
      label: 'Visualizadores',
      filterCriteria: (element:User) => element.profile.Profile === 'Guest'
    }
  ]
  lastSearchInputValue = '';
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
    private globalDataService: GlobalDataService,
  ) { }

  async ngOnInit() {
    this.dictionary = this.profileService.profileDictonary;
    this.workspaceId = localStorage.getItem('workspaceId');
    await this.getWorkspaceUsers(this.workspaceId);

    if(this.isMobile){
      this.listType = 'cards';
    }
  }

  async getWorkspaceUsers(workspaceId:string){
    try{
      const { data } = <any>await this.userService.getAllUserSKByWorkspaceId(workspaceId);
      this.users = data.getAllUserSKByWorkspaceId.map(
        user => this.userService.formatUser(user)
      );
      this.data = this.users;
      this.filterUsers();
    } catch(error){
      console.log(error)
    }

  }

  filterUsers(){
    const filter = new SKFilter();
    this.filteredUsers = filter.filterElements(this.filtersConfig, [...this.users]);
    this.data = [...this.filteredUsers];

    if(this.lastSearchInputValue) {
      this.searchUser(this.lastSearchInputValue, true);
    }
  }


  searchUser(searchInput:string, autoSearch = false){
    console.log('search')
    this.data = [...this.filteredUsers];

    const userSearchProperties = ['UserName', 'Email'];
    const search = (autoSearch ? this.lastSearchInputValue : searchInput).toLowerCase();

    this.searchedUsers = this.data.filter(
      (user:User) => this.applySearchFilter(
        user, userSearchProperties, search
      )
    );

    this.lastSearchInputValue = search;
    this.data = [...this.searchedUsers];
  }

  applySearchFilter(
    user:User,
    userSearchProperties:string[],
    search:string
  ){
    for(let userProp of userSearchProperties){
      if(user[userProp].toLowerCase().includes(search)) return true;
      if(user.profile.Profile.toLowerCase().includes(search)) return true;
      if((user.IsActive && user.InviteStatus) && 'ativo'.includes(search)) return true;
      if(!user.IsActive && 'inativo'.includes(search)) return true;
      if(!user.InviteStatus && 'convite pendente'.includes(search)) return true;
    }

    return false;
  }

  redirectToAddUser(){
    this.router.navigate(['dashboard/user/new']);
  }


  switchListType(type:string){
    this.listType = type;
  }

  changeUserStatus(user:User){
    if(user.IsActive === true ){
      this.openDeactivateDialog(user)
    }
    else {
      this.updateUserStatus(user);
    }
  }



  openDeactivateDialog(user:User){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Este usuário será desativado. Confirma a operação?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result === true) {
        this.updateUserStatus(user);
      }
    });
  }

  openResendInviteDialog(user:User){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Deseja reenviar um convite para este usuário?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result === true) {

      }
    });
  }

  openDeleteDialog(user:User){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Este usuário será desativado. Confirma a operação?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result === true) {
        this.deleteUserWorkspace(user.currentUserWorkspaceID);
      }
    });
  }

  updateUserStatus(user:User){
    this.userService.changeUserWorkspaceStatus( !user.IsActive, user.currentUserWorkspaceID )
      .subscribe(async (res:any) => {
        await this.getWorkspaceUsers(this.workspaceId)
        const { IsActive } = res.data.updateUserWorkspace;

        const messageStatus = IsActive ? 'reativado' : 'desativado';
        this.snackBarService.showNotification({
          message: `Usuário ${messageStatus} com sucesso!`,
          type: 'success'
        })
    })

  }

  deleteUserWorkspace(userWorkspaceID:string){
    this.userService.deleteUserWorkspace(userWorkspaceID)
      .subscribe(
        async (result:any) => {
          await this.getWorkspaceUsers(this.workspaceId);
          this.snackBarService.showNotification({
            message: `Usuário excluído com sucesso!`,
            type: 'success'
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }
}


