import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { AuthLayoutComponent } from './auth-layout.component';



@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule
  ]
})
export class AuthLayoutModule { }
