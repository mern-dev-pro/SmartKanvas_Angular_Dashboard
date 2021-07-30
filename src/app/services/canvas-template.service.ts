import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BooleanValueNode } from 'graphql';
import gpl from 'graphql-tag';

export interface CanvasTemplate {
  ID?: string,
  Title: string,
  Description: string,
  IsActive?: boolean,
  WorkspaceCode?:string,
  JSonTimeline?:any
}
@Injectable({
  providedIn: 'root'
})
export class CanvasTemplateService {

  responseDefault = `
    ID
    Title
    Description
    IsActive
    Workspace {
      ID
    }
    JSonTimeline
  `
  constructor(
    private apollo:Apollo
  ) {

  }

  getCanvasTemplates(){
    return this.apollo.query({
      query: gpl`
        query {
          getAllCanvas {
            ${this.responseDefault}
          }
        }
      `
    });
  }

  getCanvasByWorkspaceID(workspaceID:string){
    return this.apollo.query({
      query: gpl`
        query($workspaceID:ID!) {
          getCanvasByWorkspaceID(workspace:$workspaceID) {
            ${this.responseDefault}
          }
        }
      `,
      variables: {
        workspaceID
      }
    });
  }

  getCanvasTemplate(id:string){
    return this.apollo.query({
      query: gpl`
        query($id:ID!) {
          getCanvas(id:$id) {
            ${this.responseDefault}
          }
        }
      `,
      variables: {
        id:id
      }
    });
  }

  formatCanvasTemplates(canvasResult:any):CanvasTemplate[] {
    return canvasResult.map( canvas => {
      return {
        ID: canvas.ID,
        Title: canvas.Title,
        Description: canvas.Description,
        IsActive: canvas.IsActive,
        WorkspaceCode: canvas.Workspace.ID,
        JSonTimeline: canvas.JSonTimeline,
      }
    })
  }

  createCanvasTemplate(
    canvasTemplate:CanvasTemplate,
    userCode:string,
    workspaceCode:string
  ){
    return this.apollo.mutate({
      mutation: gpl`
        mutation($input:InputCanvasTemplateSave!){
          createCanvasTemplate(input:$input) {
            ${this.responseDefault}
          }
        }
      `,
      variables: {
        input: {
          Title: canvasTemplate.Title,
          Description: canvasTemplate.Description,
          CreatedByUserCode: userCode,
          WorkspaceCode: workspaceCode
        }
      }
    })
  }

  runUpdateMutation(variables){
    return this.apollo.mutate({
      mutation: gpl`
        mutation(
          $input:InputCanvasTemplateUpdate!,
          $canvasID:ID!
        ){
          updateCanvasTemplate(
            input:$input,
            canvasID:$canvasID
          ){
            ${this.responseDefault}
          }
        }
      `,
      variables
    })
  }
  activateDeactivateCanvasTemplate(
    id:string,
    newIsActive:boolean
  ){

    return this.runUpdateMutation({
      input: {
        IsActive: newIsActive
      },
      canvasID:id
    });
  }

  updateCanvasTemplate(
    id: string,
    canvasTemplate: CanvasTemplate
  ){
    return this.runUpdateMutation({
      input: {
        Title: canvasTemplate.Title,
        Description: canvasTemplate.Description
      },
      canvasID:id
    });
  }

  deleteCanvasTemplate(id:string){
    return this.apollo.mutate({
      mutation: gpl`
      mutation($id:ID!){
        deleteCanvasTemplate(
          canvasID:$id
        )
      }
      `,
      variables: {
        id
      }
    })
  }
  // deleteCanvasTemplate(
  //   id: string,
  //   userCode: string,
  //   userWorkspaceID: string
  // ){
  //     return this.runUpdateMutation({
  //       input:{
  //         DeletedByUserCode:userCode,
  //         UpdatedByUserCode:userCode,
  //       },
  //       canvasID:id,
  //       userWorkspaceID
  //     });
  //   return this.apollo.mutate({
  //     mutation: gpl`
  //       mutation($input:InputCanvasTemplateUpdate!, $id:ID!){
  //         updateCanvasTemplate(input:$input ,id:$id){
  //           ${this.responseDefault}
  //         }
  //       }
  //     `,
  //     variables:{
  //       input:{
  //         DeletedByUserCode:userCode,
  //         UpdatedByUserCode:userCode,
  //       },
  //       id
  //     }
  //   })
  // }
}
