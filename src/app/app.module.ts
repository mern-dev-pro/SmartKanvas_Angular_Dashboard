import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { ApolloModule } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { IosInstallComponent } from "./modules/shared/ios-install/ios-install.component";
import { TranslateFirebasePipe } from "./shared/pipe/translate-firebase.pipe";
import { workspaceReducer } from './store/workspace/workspace.reducer';
import { WindowRef } from './window.ref';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    IosInstallComponent,
    TranslateFirebasePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    }),
    AuthLayoutModule,
    AdminLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    GraphQLModule,
    ApolloModule,
    SocialLoginModule,
    StoreModule.forRoot({
      workspace:workspaceReducer
    })
  ],
  providers: [
    TranslateFirebasePipe,
    WindowRef,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.socialLogin.googleID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    CookieService
  ],
  bootstrap: [AppComponent],
  exports: [TranslateFirebasePipe],
  entryComponents: [IosInstallComponent]
})
export class AppModule {
  constructor(private winRef: WindowRef) {
  }
 }
