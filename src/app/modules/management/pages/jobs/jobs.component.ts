import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from 'src/app/services/profile.service';
import SKFilter from 'src/app/helpers/SKFilter';
import { Job } from 'src/app/models/Job';
import { JobService } from 'src/app/services/job.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
    isMobile = this.deviceService.isMobile();
    dictionary : any;
    workspaceId : string;
    listType = 'grid';
    jobs : Job[];
    data : Job[];
    filteredJobs : Job[];
    searchedJobs : Job[];

    constructor(
        private deviceService: DeviceDetectorService,
        private profileService: ProfileService,
        private jobservice: JobService,
        private router: Router,
    ){}
    async ngOnInit() {
        this.dictionary = this.profileService.profileDictonary;
        this.workspaceId = localStorage.getItem('workspaceId');
        this.getWorkspaceJobs(this.workspaceId);
        
        if(this.isMobile){
            this.listType = 'cards';
        }
    }

    async getWorkspaceJobs(workspaceId: string){
        try{
            const { data } = <any>await this.jobservice.getAllJobWorkspace(workspaceId);
            this.jobs = data.getAllJob.map(
                job => this.jobservice.formatJob(job)
            );
            this.data = this.jobs;            
            console.log("Data for Job", data);
        }catch(err){
            console.log(err)
        }
    }

    switchListType(type:string){
        this.listType = type;
    }

    redirectToAddJob(){
        this.router.navigate(['dashboard/job/new']);
    }
}