export interface Job {
    ID?:string;
    Title: String;
    Description: String;
    StartDate: String;
    FinishDate: String;
    ActualFinishDate: String;
    JobStatusDate: String;
    CreatedDate: String;
    LastUpdate: String;
    DeletedDate: String;
    JSonTimeline: JSON;
    JSonTags: JSON;
    JSonParameters: JSON;
    Workspace:any[];
    JobType: any[];
    JobStatus: any[];
    ResponsibleUser: any[];
    CreatedByUser: any[];
    UpdatedByUser: any[];
    DeletedByUser: any[];
}