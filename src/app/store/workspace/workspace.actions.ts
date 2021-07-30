import { Action } from "@ngrx/store";

export const ADD_WORKSPACE = 'ADD_WORKSPACE';

export class AddWorkspace implements Action {
  readonly type = ADD_WORKSPACE;
  payload: string;
}
