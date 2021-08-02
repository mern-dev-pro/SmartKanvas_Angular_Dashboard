import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/models/Job';
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
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
      EndDate: ['',Validators.required]
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

}
