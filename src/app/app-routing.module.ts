import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundLayoutComponent } from './layouts/not-found-layout/not-found-layout.component';
import { ResetPasswordComponent } from './modules/auth/pages/reset-password/reset-password.component';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { CanvasTemplateComponent } from './modules/management/pages/canvas-template/canvas-template.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/management/management.module').then((m) => m.ManagementModule),
      },
    ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path:'dashboard/canvas-template/new',
    component: CanvasTemplateComponent
  },
  {
    path:'dashboard/canvas-template/edit/:id',
    component: CanvasTemplateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
  },
  {
    path: '**',
    component: NotFoundLayoutComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
