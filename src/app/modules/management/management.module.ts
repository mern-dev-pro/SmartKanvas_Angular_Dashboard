import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

//syncfusion
import  { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

import { RouterModule } from '@angular/router';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { JobService } from 'src/app/services/job.service';

import { ModalNewUserComponent } from './components/modal-new-user/modal-new-user.component';
import { ManagementRoutingModule } from './management-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { CanvasTemplatesComponent } from './pages/canvas-templates/canvas-templates.component';
import { CanvasTemplateComponent } from './pages/canvas-template/canvas-template.component';
import { CanvasTemplateFormComponent } from './components/canvas-template-form/canvas-template-form.component';
import { ManagementHeaderComponent } from './components/management-header/management-header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ManagementPagesTemplateComponent } from './components/management-pages-template/management-pages-template.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { JobsComponent } from './pages/jobs/jobs.component'
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ModalNewJobComponent } from './components/modal-new-job/modal-new-job.component';
import { JobFormComponent } from './pages/job-form/job-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    ModalNewUserComponent,
    CanvasTemplatesComponent,
    CanvasTemplateComponent,
    CanvasTemplateFormComponent,
    ManagementHeaderComponent,
    TimelineComponent,
    ManagementPagesTemplateComponent,
    UserFormComponent,
    JobsComponent,
    ModalNewJobComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardLayoutModule,
    GridAllModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[CanvasTemplateComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    UserService,
    AuthService,
    JobService
  ]
})
export class ManagementModule { }
