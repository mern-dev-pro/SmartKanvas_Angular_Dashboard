import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Member {
  memberName: string;
  memberProfile: string;
  isValid:boolean;
  tags: number[];
  ID: string;
  Image: string;
}

@Component({
  selector: 'app-modal-edit-job-member',
  templateUrl: './modal-edit-job-member.component.html',
  styleUrls: ['./modal-edit-job-member.component.scss']
})
export class ModalEditJobMemberComponent implements OnInit {

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
  ];
  
  memberData: any
  constructor(
    public dialogRef: MatDialogRef<ModalEditJobMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member
  ) { }
  
  onNoClick(){
     this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  

}
