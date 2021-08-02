import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';
import { Job } from '../models/Job';
import * as moment from 'moment';

@Injectable()
export class JobService {
    constructor(
        private apollo: Apollo
    ){ }

    getAllJobWorkspace(workspaceId:string){
        return this.apollo.query({
            query: gql`
                query($id:ID!){
                    getAllJob(workspaceCode: $id){
                        ID
                        Title
                        Description
                        StartDate
                        FinishDate
                        ActualFinishDate
                        JobStatusDate
                        CreatedDate
                        LastUpdate
                        DeletedDate   
                        JSonTimeline
                        JSonTags
                        JSonParameters 
                        Workspace {
                            ID
                            WorkspaceName
                        }
                        JobType {
                            ID
                            Title
                            IsActive
                            Image
                        }
                        JobStatus {
                            ID
                            Status
                        }
                        ResponsibleUser {
                            ID
                            UserName
                        }
                        CreatedByUser {
                            ID
                            UserName
                        }
                        UpdatedByUser {
                            ID
                            UserName
                        }
                        DeletedByUser {
                            ID
                            UserName
                        }
                    }
                }
            `,
            variables:{
                id:workspaceId
            }
        }).toPromise()
    }
    formatJob(job: any): Job{
        const workspaceId = localStorage.getItem('workspaceId');
        const formatedJob: Job = {
            ID: job.ID,
            Title: job.Title,
            Responsible: job.ResponsibleUser,
            Type: job.JobType,
            Status: job.JobStatus,
            Tags: job.JSonTags
        }
        return formatedJob
    }
}