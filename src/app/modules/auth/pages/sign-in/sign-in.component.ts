import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { take } from 'rxjs/operators';
import { EmailGlobalValidator } from 'src/app/core/validators/email.validator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  authForm: FormGroup;
  loading: boolean;

  constructor(
    private authServiceSmartKanvas: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private authService: SocialAuthService
  ) {
    this.setAuthForm();
  }

  ngOnInit(): void {
  }

  setAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailGlobalValidator.emailValidator])],
      password: ['', Validators.required],
    })
  }

  loginEmailPass() {
    this.authServiceSmartKanvas
    .login(this.authForm.value.email, this.authForm.value.password)
    .pipe(take(1))
    .subscribe((res: any) => {
      localStorage.setItem('userID', res.user.ID);
      localStorage.setItem('userEmail', res.user.Email);
      localStorage.setItem('userName', res.user.UserName);

      this.authServiceSmartKanvas.setToken(res.accessToken, res.refreshToken);
      this.loading = false;
      this.snackBarService.showNotification({message:'Bem-vindo!', type: 'success'});
      this.router.navigateByUrl('dashboard');
    });

  }

  goToCreateAccount() {
    this.router.navigateByUrl('auth/create-account');
  }

  recoverPassword() {
    this.router.navigateByUrl('auth/recover-password');
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

  loginLinkedin(){
    this.authServiceSmartKanvas.linkedinLogin();
  }
}
