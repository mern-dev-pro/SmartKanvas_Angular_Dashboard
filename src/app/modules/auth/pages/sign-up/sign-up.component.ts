import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { take } from 'rxjs/operators';
import { MustMatch } from 'src/app/core/validators/confirm-password.validator';
import { EmailGlobalValidator } from 'src/app/core/validators/email.validator';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalTranslateService } from 'src/app/services/global-translate.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  createAccountForm: FormGroup;
  finalRegisterForm: FormGroup;
  createAccountSocialMediaForm: FormGroup;
  showInitialContainer = true;
  showPersonalData = true;
  showSocialMediaData = false;
  showFinishAccount = true;

  emailAccount = new FormControl('',  Validators.compose([Validators.required, EmailGlobalValidator.emailValidator]));
  selectLoginProvider = false;
  allSizeWorkspace: any;
  allClientType: any;
  allBusinessArea: any;
  allWorkspaceStatus: any;
  allProfile: any;
  createAccountProvider: any = null;
  userSocialMedia: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
    private authService: SocialAuthService,
    private authServiceSmartKanvas: AuthService,
    private translateService: TranslateService,
    private gTranslate: GlobalTranslateService // add service into constructor

  ) { }

  ngOnInit(): void {
    this.setCreateAccountForm();
    this.setFinalRegisterForm();
    this.setCreateAccountSocialMediaForm();
    for (let index = 0; index < 3; index++) {
      this.addEmailWorkers();
    }
    this.getAllBusinessArea();
    this.getAllClientSize();
    this.getAllClientType();
    this.getAllWorkspaceStatus();
    this.getAllProfiles();
  }


  setCreateAccountForm() {
    this.createAccountForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(150)] ],
        profileUser: ['', [Validators.required, Validators.maxLength(150)] ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        workSpaceName: ['', [Validators.required, Validators.maxLength(150)]],
        workSpaceSize: ['', [Validators.required, Validators.maxLength(150)]],
        workSpaceStatus: ['', [Validators.required, Validators.maxLength(150)]],
        useTerm: [null, [Validators.required]]
      },
      { validator: MustMatch('password', 'confirmPassword') }
    )
  }

  setCreateAccountSocialMediaForm() {
    this.createAccountSocialMediaForm = this.formBuilder.group(
      {
        workSpaceName: ['', [Validators.required, Validators.maxLength(150)]],
        workSpaceSize: ['', [Validators.required, Validators.maxLength(150)]],
        workSpaceStatus: ['', [Validators.required, Validators.maxLength(150)]],
        profileUser: ['', [Validators.required, Validators.maxLength(150)] ],
        useTerm: [null, [Validators.required]]
      },
    )
  }


  setFinalRegisterForm() {
    this.finalRegisterForm = this.formBuilder.group(
      {
        workSpaceType: ['', [Validators.required, Validators.maxLength(150)] ],
        areaActuation: ['', [Validators.required, Validators.minLength(6)]],
        emailsCoWorkers: this.formBuilder.array([]),
      }
    )
  }

  initEmailWorkers() {
    return new FormGroup({
      email: new FormControl('', [EmailGlobalValidator.emailValidator]),
    })
  }

  addEmailWorkers() {
    const control = this.finalRegisterForm.get('emailsCoWorkers') as FormArray
    control.push(this.initEmailWorkers())
  }

  backToHome() {
    this.router.navigateByUrl('auth');
  }

  createUser() {
    if(this.createAccountProvider !== null) {
      this.tryCreateAccountStageThird('socialMedia');
    } else {
      this.tryCreateAccountStageThird('password');
    }

    this.userService.createAccount({
      email: this.emailAccount.value,
      userName: this.createAccountForm.value.name,
      profileCode: this.createAccountForm.value.profileUser,
      password: this.createAccountForm.value.password,
      workSpaceName: this.createAccountForm.value.workSpaceName,
      workspaceURL: this.createAccountForm.value.workSpaceName,
      workSpaceStatusCode: this.createAccountForm.value.workSpaceStatus,
      clientSizeCode: this.createAccountForm.value.workSpaceSize,
      businessAreaCode: this.finalRegisterForm.value.areaActuation,
      clientTypeCode: this.finalRegisterForm.value.workSpaceType,
      invitesEmails: this.finalRegisterForm.get('emailsCoWorkers').value.map(list => list.email)
    }).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.snackBarService.showNotification({message: "Conta criada com sucesso." , type: 'success'});
        this.loginEmailPass();
      },
      (err) => {},
      () => {},
    )
  }

  createAccountWithGoogle() {
    this.userService.createAccountSocialMedia({
      userName: this.userSocialMedia.name,
      workSpaceName: this.createAccountSocialMediaForm.value.workSpaceName,
      workspaceURL: this.createAccountSocialMediaForm.value.workSpaceName,
      workSpaceStatusCode: this.createAccountSocialMediaForm.value.workSpaceStatus,
      clientSizeCode: this.createAccountSocialMediaForm.value.workSpaceSize,
      businessAreaCode: this.finalRegisterForm.value.areaActuation,
      clientTypeCode: this.finalRegisterForm.value.workSpaceType,
      invitesEmails: this.finalRegisterForm.get('emailsCoWorkers').value.map(list => list.email),
      profileCode: this.createAccountSocialMediaForm.value.profileUser,
      token: this.userSocialMedia.idToken
    }).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.snackBarService.showNotification({message: "Conta criada com sucesso." , type: 'success'});
        this.loginGoogle();
      },
      (err) => {},
      () => {}
    )
  }

  backStage(stage, socialMedia?) {
    if(stage === 2 && this.createAccountProvider == null) {
      this.showInitialContainer = true;
      this.showPersonalData = false;
    } else if (stage === 2 && this.createAccountProvider !== null) {
      this.showInitialContainer = true;
      this.showPersonalData = false;
      this.showSocialMediaData = false;
      this.showFinishAccount = false;
    } else if(stage === 3 && this.createAccountProvider === null) {
      this.showInitialContainer = false;
      this.showPersonalData = true;
      this.showSocialMediaData = false;
      this.showFinishAccount = false;
    } else if (stage === 3 && this.createAccountProvider !== null) {
      this.showInitialContainer = false;
      this.showPersonalData = false;
      this.showSocialMediaData = true;
      this.showFinishAccount = false;
    }
  }

  continueForPersonalData() {
    this.showInitialContainer = false;
    this.showPersonalData = true;
    this.tryCreateAccountFirstStage('password');
  }

  onSelectLoginProvider(provider) {
    this.createAccountProvider = provider;
    if(provider === 'google') {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        this.userSocialMedia = user;
        this.selectLoginProvider = true;
        this.showInitialContainer = false;
        this.showSocialMediaData = true;
      });
    }
    this.tryCreateAccountFirstStage('socialMedia');
  }

  continueForFinalRegisterForm() {
    this.showInitialContainer = false;
    this.showPersonalData = false;
    this.showSocialMediaData = false;
    this.showFinishAccount = true;
    if(this.createAccountProvider !== null) {
      this.tryCreateAccountSecondStageSocialMedia('socialMedia');
    } else {
      this.tryCreateAccountSecondStage('password');
    }
  }


  getAllClientSize() {
    this.userService.getAllSizeWorkspace().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.allSizeWorkspace = res.data.getAllClientSize;
      },
      (err) => {},
      () => {}
    )
  }

  getAllClientType() {
    this.userService.getAllClientTypeWorkspace().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.allClientType = res.data.getAllClientType;
      },
      (err) => {},
      () => {}
    )
  }

  getAllBusinessArea() {
    this.userService.getAllBusinessArea().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.allBusinessArea = res.data.getAllBusinessArea;
        this.translateService.instant('business', {value: this.allBusinessArea.map((businessArea, index) => businessArea.BusinessAre)})
      },
      (err) => {},
      () => {}
    )
  }

  getAllWorkspaceStatus() {
    this.userService.getAllWorkspaceStatus().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.allWorkspaceStatus = res.data.getAllWorkspaceStatus;
        const status = this.allWorkspaceStatus.filter(status => status.TagControl === 'IN_PROGRESS');
        this.createAccountForm.get('workSpaceStatus').setValue(status[0].ID);
        this.createAccountSocialMediaForm.get('workSpaceStatus').setValue(status[0].ID);
      },
      (err) => {},
      () => {}
    )
  }

  getAllProfiles() {
    this.profileService.getAllProfiles().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.allProfile = res.data.getAllProfile;
        const admin = this.allProfile.filter(profile => profile.Profile === 'Administrator');
        this.createAccountForm.get('profileUser').setValue(admin[0].ID);
        this.createAccountSocialMediaForm.get('profileUser').setValue(admin[0].ID);
      },
      (err) => {},
      () => {}
    )
  }

  tryCreateAccountFirstStage(authType) {
    this.userService.tryCreateAccountStageOne(authType, this.emailAccount.value).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
      },
      (err) => {
      },
      () => {}
    )
  }

  tryCreateAccountSecondStage(authType) {
    this.userService.tryCreateAccountStageSecond(
      authType,
      this.emailAccount.value,
      this.createAccountForm.value.workSpaceName,
      this.createAccountForm.value.workSpaceName,
      this.createAccountForm.value.name,
      this.createAccountForm.value.password,
      this.createAccountForm.value.workSpaceSize
    ).pipe(
      take(1)
    ).subscribe(
      (res: any) => {

      },
      (err) => {},
      () => {}
    )
  }

  tryCreateAccountSecondStageSocialMedia(authType) {
    this.userService.tryCreateAccountStageSecond(
      authType,
      this.emailAccount.value,
      this.createAccountSocialMediaForm.value.workSpaceName,
      this.createAccountSocialMediaForm.value.workSpaceUrl,
      this.createAccountSocialMediaForm.value.name,
      this.createAccountSocialMediaForm.value.password,
      this.createAccountSocialMediaForm.value.workSpaceSize
    ).pipe(
      take(1)
    ).subscribe(
      (res: any) => {

      },
      (err) => {},
      () => {}
    )
  }

  tryCreateAccountStageThird(authType) {
    this.userService.tryCreateAccountStageThird(
      authType,
      this.emailAccount.value,
      this.createAccountForm.value.workSpaceName,
      this.createAccountForm.value.workSpaceUrl,
      this.createAccountForm.value.name,
      this.createAccountForm.value.password,
      this.finalRegisterForm.value.workSpaceType,
      this.createAccountForm.value.workSpaceSize,
      this.finalRegisterForm.value.areaActuation,
      this.finalRegisterForm.get('emailsCoWorkers').value[0].email,
      this.finalRegisterForm.get('emailsCoWorkers').value[1].email,
      this.finalRegisterForm.get('emailsCoWorkers').value[2].email,
    ).pipe(
      take(1)
    ).subscribe(
      (res: any) => {

      },
      (err) => {},
      () => {}
    )
  }

  loginEmailPass() {
    this.authServiceSmartKanvas
    .login(this.emailAccount.value, this.createAccountForm.value.password)
    .pipe(take(1))
    .subscribe((res: any) => {
      localStorage.setItem('userID', res.user.ID);
      localStorage.setItem('userEmail', res.user.Email);
      localStorage.setItem('userName', res.user.UserName);
      this.authServiceSmartKanvas.setToken(res.accessToken, res.refreshToken);
      this.snackBarService.showNotification({message:'Bem-vindo!', type: 'success'});
      this.router.navigateByUrl('dashboard');
    });

  }

  loginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.authServiceSmartKanvas.loginWithGoogle(user.idToken).pipe(
        take(1)
      ).subscribe(
        (res: any) => {
          localStorage.setItem('userID', res.user.ID);
          localStorage.setItem('userEmail', res.user.Email);
          localStorage.setItem('userName', res.user.UserName);
          this.authServiceSmartKanvas.setToken(res.accessToken, res.refreshToken);
          this.snackBarService.showNotification({message:'Bem-vindo!', type: 'success'});
          this.router.navigateByUrl('dashboard');
        },
        (err) => {},
        () => {}
      )
    });
  }

  onChangeState(event:StepperSelectionEvent){
    const { selectedIndex, previouslySelectedIndex} = event;
    switch(selectedIndex){
      case 0:
        this.backStage(2);
        break;
      case 1:
        if(previouslySelectedIndex == 0) this.continueForPersonalData();
        else this.backStage(3);
        break;
      case 2:
        this.continueForFinalRegisterForm();
        break;

    }
  }
}
