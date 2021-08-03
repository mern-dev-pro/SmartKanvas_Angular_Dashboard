import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Job } from 'src/app/models/Job';
import { ModelAddJobMemberComponent } from '../../components/model-add-job-member/model-add-job-member.component';
import { ModalEditJobMemberComponent } from '../../components/modal-edit-job-member/modal-edit-job-member.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  jobID:string;
  jobForm: FormGroup;
  job: Job;
  types = ['Processo', 'Projeto', 'Registro de Oportunidade'];
  statuses = ['Em Planejamento', 'Em Execução', 'EnCerrado'];
  rowMode = 'Vertical';
 
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
  ];

  memberData:{
    memberName: string;
    memberProfile: string;
    isValid:boolean;
    tags: number[];
  }

  @ViewChild('grid') public grid: GridComponent;

  memberDataArray: any[] = [];

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
  }
  
  ngOnInit(): void {
    this.jobID = this.route.snapshot.params['id'];
    this.setForm();
  }
  navigateBack(){
    this.router.navigate(['dashboard/job']);
  }

  setForm():void{
    this.jobForm = this.fb.group({
      Title: ['',Validators.required],
      Description: ['',Validators.required],
      Type: ['',Validators.required],
      Status: ['',Validators.required],
      ResponsiveUser: ['',Validators.required],
      StartDate: ['',Validators.required],
      EndDate: ['',Validators.required],
      Tags: ['', Validators.required]
    });
  }
  updateForm():void{
    const job = this.job;
    this.jobForm = this.fb.group({
      
    });
  }

  onSubmit(){
    if(this.jobID){
      console.log("Job is updated");
    }else {
      console.log("Job is created");
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModelAddJobMemberComponent, {
      width: '600px',
      height: '400px',
      data: {
        
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.memberData = result;
      console.log(this.memberData);
      if(this.memberData){
        if (this.memberDataArray.findIndex( (item: any) => item.memberName === result.memberName ) > -1)
          return;
        this.memberDataArray.push(this.memberData)
        this.grid.refresh();
      }
    });
  }
  openDialogEdit(memberName: string): void {
    const dialogRef = this.dialog.open(ModalEditJobMemberComponent, {
      width: '600px',
      height: '400px',
      data: {
        memberName: this.memberDataArray.find((item) => item.memberName === memberName).memberName,
        memberProfile: this.memberDataArray.find((item) => item.memberName === memberName).memberProfile,
        isValid: this.memberDataArray.find((item) => item.memberName === memberName).isValid,
        tags: this.memberDataArray.find((item) => item.memberName === memberName).tags,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
