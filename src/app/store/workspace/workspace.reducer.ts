import { Workspace } from 'src/app/models/Workspace';
import * as WorkspaceActions from './workspace.actions';

const initialState:Workspace = {
  ID:'kdksjdsksnksn',
  WorkspaceName: 'Espaço de Trabalho'
};

export function workspaceReducer( state = initialState, action: WorkspaceActions.AddWorkspace ){
  switch(action.type) {
    case WorkspaceActions.ADD_WORKSPACE:
      return {
        ...state,
        workspace: Object.assign(action.payload, state)
      }
  }
}
