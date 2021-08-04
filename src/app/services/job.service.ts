import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';
import { Job, InputJobSave, InputJobUpdate } from '../models/Job';
import * as moment from 'moment';
import { JsonpClientBackend } from '@angular/common/http';

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
            ID:job.ID,
            Title: job.Title,
            Description: job.Description,
            StartDate: job.StartDate,
            FinishDate: job.FinishDate,
            ActualFinishDate: job.ActualFinishDate,
            JobStatusDate: job.JobStatusDate,
            CreatedDate: job.CreatedDate,
            LastUpdate: job.LastUpdate,
            DeletedDate: job.DeletedDate,
            JSonTimeline: job.JSonTimeline,
            JSonTags: job.JSonTags,
            JSonParameters: job.JSonParameters,
            Workspace: job.Workspace,
            JobType: job.JobType,
            JobStatus: job.JobType,
            ResponsibleUser: job.ResponsibleUser,
            CreatedByUser: job.CreatedByUser,
            UpdatedByUser: job.UpdatedByUser,
            DeletedByUser: job.DeletedByUser,
        }
        return formatedJob
    }
    createNewJob(data: any){
        return this.apollo.mutate({
            mutation: gql`
                mutation($input: InputJobSave!){
                    createJob(input: $input){
                        Title
                        Description
                        StartDate
                        FinishDate
                    }
                }
            `,
            variables:{
                input: data
            }
        })
    }
    getAllJobStatus(workspaceID:string){
        return this.apollo.query(
            {
                query:gql `query($id: ID!){
                    getAllJobStatus(workspaceCode: $id){
                        ID
                        Status
                        Position
                        TagControl
                        Workspace{
                            ID
                        }
                    }
                }`,
                variables:{
                    id: workspaceID
                }
            }
        )
    }
    getAllJobType(workspaceID:string){
        return this.apollo.query(
            {
                query:gql `query($id: ID!){
                    getAllJobType(WorkspaceCode: $id){
                        ID
                        Title
                        Description
                        IsActive
                        Image
                        TagControl
                        JSonTimeline
                        Workspace{
                            ID
                        }
                    }
                }`,
                variables:{
                    id: workspaceID
                }
            }
        )
    }
}
