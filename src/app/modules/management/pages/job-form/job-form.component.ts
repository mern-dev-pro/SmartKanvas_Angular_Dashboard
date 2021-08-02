import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Job } from 'src/app/models/Job';
import { ModelAddJobMemberComponent } from '../../components/model-add-job-member/model-add-job-member.component';
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

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
  ];

  animal: string;
  name: string;
  
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
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
