import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { EmailGlobalValidator } from 'src/app/core/validators/email.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  emailRecovery = new FormControl('', [Validators.required, EmailGlobalValidator.emailValidator]);
  emailIsSend: boolean = false;
  emailSendWithErro: boolean = false;
  resetPasswordSuccess = false;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  backToLogin() {
    this.router.navigateByUrl('auth')
  }

  recoveryPassword() {
    this.userService.requestResetPassword(this.emailRecovery.value).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.resetPasswordSuccess = res.data.resetPassword;
      },
      (err) => {
        this.resetPasswordSuccess = false;
      },
      () => {}
    )
  }
}


