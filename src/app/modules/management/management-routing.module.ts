import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasTemplatesComponent } from './pages/canvas-templates/canvas-templates.component';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    component: UsersComponent
  },
  {
    path: 'list-user',
    redirectTo:''
  },
  {
    path: 'list-canvas-template',
    component: CanvasTemplatesComponent
  },
  {
    path:'user/new',
    component: UserFormComponent
  },
  {
    path:'user/:id/edit',
    component: UserFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
