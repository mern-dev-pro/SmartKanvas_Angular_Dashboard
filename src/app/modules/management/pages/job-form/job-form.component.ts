import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Job} from 'src/app/models/Job';
import { User } from 'src/app/models/User';
import { ModelAddJobMemberComponent } from '../../components/model-add-job-member/model-add-job-member.component';
import { ModalEditJobMemberComponent } from '../../components/modal-edit-job-member/modal-edit-job-member.component';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { JobService } from 'src/app/services/job.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component'; 
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  jobID:string;
  jobForm: FormGroup;
  job: Job;
  types: any[] = [];
  statuses:any[] = [];
  rowMode = 'Vertical';
  jobstatusArray: any;
  users: User[];
 
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
    ID: String;
    Image: String;
  }

  @ViewChild('grid') public grid: GridComponent;

  memberDataArray: any[] = [];

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private jobService: JobService,
  ) { 
  }
  
  ngOnInit(): void {
    this.jobID = this.route.snapshot.params['id'];
    if(this.jobID){
      this.getJobById(this.jobID);
    }
    else{
      this.setForm("", "");
    }
    const workspaceID = localStorage.getItem('workspaceId')
    this.jobService.getAllJobStatus(workspaceID).subscribe(
      (result:any) => {
        if(result){
          this.statuses = result.data.getAllJobStatus
        }
      }
    );
    this.jobService.getAllJobType(workspaceID).subscribe(
      (result:any) => {
        if(result){
          this.types = result.data.getAllJobType
        }
      }
    )
    this.getWorkspaceUsers(workspaceID);
  }
  navigateBack(){
    this.router.navigate(['dashboard/job']);
  }

  setForm(title:string, description: string):void{
    this.jobForm = this.fb.group({
      Title: [title, Validators.required],
      Description: [description, Validators.required],
      Type: [''],
      Status: [''],
      ResponsiveUser: ['', Validators.required],
      StartDate: ['',Validators.required],
      EndDate: ['',Validators.required],
      Tags: ['', Validators.required]
    });
  }
  onSubmit(){
    if(this.jobID){
      console.log("Job is updated");
      this.updateJob();
    }else {
      console.log("Job is created");
      this.createJob();
    }
  }
  
  createJob(){
    const {Title, Description, Type, Status, ResponsiveUser, StartDate, EndDate, Tags} = this.jobForm.value;
    const responsiveUserID = this.users.find((item: any) => item.UserName = ResponsiveUser).ID;
    const JobTypeCode = this.types.find((item: any) => item.Title = Type).ID;
    const JobStatusCode = this.statuses.find((item: any) => item.Status = Status).ID;
    const InputJob:any = {
      Title,
      Description,
      StartDate,
      FinishDate: EndDate,
      WorkspaceCode: localStorage.getItem('workspaceId'),
      JobTypeCode,
      JobStatusCode,
      ResponsibleUserCode:responsiveUserID,
    }
    this.jobService.createNewJob(InputJob).subscribe(
      (res:any) => {
        console.log(res);
        this.createJobMembers(res.data.createJob.ID);
      }
    )
  }

  updateJob(){
    const workspaceID = localStorage.getItem('workspaceId')
    const {Title, Description,ResponsiveUser, StartDate, EndDate} = this.jobForm.value;
    const responsiveUserID = this.users.find((item: any) => item.UserName = ResponsiveUser).ID;
    console.log(responsiveUserID);
    const InputJob:any = {
      Title,
      Description,
      StartDate,
      FinishDate: EndDate,
      ResponsibleUser:responsiveUserID,
    }
    this.jobService.updateJob(InputJob, this.jobID, workspaceID).subscribe(
      (result:any) => {
        console.log(result);
      }
    )
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
      height: '450px',
      data: {
        memberName: this.memberDataArray.find((item) => item.memberName === memberName).memberName,
        memberProfile: this.memberDataArray.find((item) => item.memberName === memberName).memberProfile,
        isValid: this.memberDataArray.find((item) => item.memberName === memberName).isValid,
        tags: this.memberDataArray.find((item) => item.memberName === memberName).tags,
        ID: this.memberDataArray.find((item) => item.memberName === memberName).ID,
        Image: this.memberDataArray.find((item) => item.memberName === memberName).Image
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.memberDataArray.find((item:any)=>item.ID === result.ID).memberProfile = result.memberProfile;
        this.memberDataArray.find((item:any)=>item.ID === result.ID).isValid = result.isValid;
        this.memberDataArray.find((item:any)=>item.ID === result.ID).tags = result.tags;
        this.grid.refresh();
      }
    });
  }
  onClickMemberDelete(memberName:string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Confirma a exclusão do membro do trabalho?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result === true) {
        this.deleteMember(memberName);
      }
    });
  }
  
  deleteMember(memberName:string){
    this.memberDataArray = this.memberDataArray.filter((item:any)=> item.memberName !== memberName);
    this.grid.refresh();
    this.jobService.deleteJobMember(this.memberDataArray.filter((item:any)=> item.memberName == memberName)[0].ID, localStorage.getItem('workspaceId'))
  }

  async getWorkspaceUsers(workspaceId:string){
    try{
      const { data } = <any>await this.userService.getAllUserSKByWorkspaceId(workspaceId);
      this.users = data.getAllUserSKByWorkspaceId.map(
        user => this.userService.formatUser(user)
      );     
    } catch(error){
      console.log(error)
    }
  }

  getJobById(id: string){
    this.jobService.getJobByID(id).subscribe(
      (result:any)=>{
        console.log(result); 
        this.setForm(result.data.getJob.Title, result.data.getJob.Description);
      }
    )
  }

  createJobMembers(jobId:string){
    this.memberDataArray.map((member: any) => {
      const input = {
        JobProfileTitle: member.memberProfile,
        CanAllocateTasks: member.isValid,
        UserCode: this.users.find((item: any) => item.UserName = member.memberName).ID,
        JobCode: jobId
      }
      this.jobService.createJobMember(input, localStorage.getItem('workspaceId')).subscribe((result: any) => { console.log(result);
      });
    })
  }
}
