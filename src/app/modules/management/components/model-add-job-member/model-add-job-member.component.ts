import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

export interface Member {
  memberName: string;
  memberProfile: string;
  isValid:boolean;
  tags: number[];
  ID:string;
  Image: string;
}

@Component({
  selector: 'app-model-add-job-member',
  templateUrl: './model-add-job-member.component.html',
  styleUrls: ['./model-add-job-member.component.scss']
})
export class ModelAddJobMemberComponent implements OnInit {
  isClosed = false;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
  ];
  profiles = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Membro da Equipe' },
    { id: 3, name: 'Visitante' },
  ]
  memberData: any

  users: User[];
  datas: User[];
  filteredUsers: User[];
  searchedUsers: User[];
  workspaceId:string;

  constructor(
    public dialogRef: MatDialogRef<ModelAddJobMemberComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Member
  ) {}

  async getWorkspaceUsers(workspaceId:string){
    try{
      const { data } = <any>await this.userService.getAllUserSKByWorkspaceId(workspaceId);
      this.users = data.getAllUserSKByWorkspaceId.map(
        user => this.userService.formatUser(user)
      );
      this.datas = this.users;
      console.log(this.datas);
    } catch(error){
      console.log(error)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  async ngOnInit(){
    this.workspaceId = localStorage.getItem('workspaceId');
    await this.getWorkspaceUsers(this.workspaceId);
  }

  setIDImage(event: any){
    console.log('ppp', event.value);
    this.data.ID= this.datas.find((item: User) => item.UserName === event.value).ID;
    this.data.Image = this.datas.find((item: User) => item.UserName === event.value).Photo;
  }

}
