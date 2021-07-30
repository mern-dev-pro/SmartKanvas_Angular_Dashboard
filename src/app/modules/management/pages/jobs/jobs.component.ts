import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileService } from 'src/app/services/profile.service';
import SKFilter from 'src/app/helpers/SKFilter';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
    isMobile = this.deviceService.isMobile();
    dictionary:any;
    workspaceId:string;
    listType = 'grid';
    constructor(
        private deviceService: DeviceDetectorService,
        private profileService: ProfileService,
    ){}
    async ngOnInit() {
        this.dictionary = this.profileService.profileDictonary;
        this.workspaceId = localStorage.getItem('workspaceId');
        
        if(this.isMobile){
            this.listType = 'cards';
        }
    }
}