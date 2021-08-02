import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-model-add-job-member',
  templateUrl: './model-add-job-member.component.html',
  styleUrls: ['./model-add-job-member.component.scss']
})
export class ModelAddJobMemberComponent implements OnInit {

  selectedCar: number;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
  ];
  constructor(
    public dialogRef: MatDialogRef<ModelAddJobMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
