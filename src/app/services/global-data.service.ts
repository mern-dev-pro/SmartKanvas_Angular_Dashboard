import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  loggedUser:User;
  userWorkspaceID:string;

  constructor(
    private userService:UserService
  ) { }

  async setFormatedUser() {
    const userId = localStorage.getItem('userID')

    const res = <any>await this.userService.getUserLogged(userId).pipe(
      take(1)
    ).toPromise()

    const userSK = res.data.getUserSK
    const workspaces = this.userService.getWorkspaces(userSK);
    const workspaceId = workspaces[0].ID;
    const userWorkspace = this.userService.getCurrentUserWorkspace(
      userSK, workspaceId
    );

    localStorage.setItem('workspaceId',workspaceId);
    localStorage.setItem('userWorkspaceId',userWorkspace.ID);

    this.loggedUser = this.userService.formatUser(userSK);
  }
}
