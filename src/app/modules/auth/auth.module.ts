import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationLoaderFactory } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [SignUpComponent, SignInComponent, RecoverPasswordComponent, ResetPasswordComponent],
    imports: [
      CommonModule,
      AuthRoutingModule,
      RouterModule,
      FlexLayoutModule,
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatIconModule,
      MatCheckboxModule,
      MatSlideToggleModule,
      MatSelectModule,

      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
      }),

      MatStepperModule,
      MatTooltipModule,
      FormsModule,
      SharedModule,
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
      }),

    ],
     providers: [
       AuthService,
       UserService
     ]
})
export class AuthModule { }
