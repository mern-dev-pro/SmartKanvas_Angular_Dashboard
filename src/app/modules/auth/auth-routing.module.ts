import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'create-account',
    component: SignUpComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
