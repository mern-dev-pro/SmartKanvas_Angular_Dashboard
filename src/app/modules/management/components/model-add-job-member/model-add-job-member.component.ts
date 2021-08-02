import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  memberForm: FormGroup;
  selectedCar: number;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
  ];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ModelAddJobMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  setForm():void{
    this.memberForm = this.fb.group({
      Member: ['',Validators.required],
      Profile: ['',Validators.required],
      Tags: ['',Validators.required],
      isValid: [false ,Validators.required]
    });
  }
  updateForm():void{
    // const job = this.job;
    // this.jobForm = this.fb.group({
      
    // });
  }

  onSubmit(){
    // if(this.jobID){
    //   console.log("Job is updated");
    // }else {
    //   console.log("Job is created");
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.setForm();
  }

}
