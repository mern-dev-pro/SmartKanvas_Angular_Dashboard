import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatSidenavModule
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ManagementModule } from 'src/app/modules/management/management.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ManagementModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    }),
    FlexLayoutModule,
    MatMenuModule,
    MatBadgeModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatSidenavModule,
    SharedModule
  ],
})
export class AdminLayoutModule { }
