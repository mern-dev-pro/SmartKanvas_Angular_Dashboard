import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MustMatch } from 'src/app/core/validators/confirm-password.validator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formResetPass: FormGroup;
  token: any;
  equalPassword = true;
  notImgCard = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
   }

  ngOnInit(): void {
    this.setFormResetPass();
  }


  setFormResetPass() {
    this.formResetPass = this.formBuilder.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('newPassword', 'confirmPassword') }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('/');
  }


  recoveryPassword() {
    if (
      this.formResetPass.value.newPassword ===
      this.formResetPass.value.confirmPassword
    ) {
      this.equalPassword = true;
      this.userService
        .changePassword(
          this.formResetPass.value.newPassword,
          this.formResetPass.value.confirmPassword,
          this.token
        )
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.snackBarService.showNotification({message:'Senha alterada com sucesso!', type: 'success'});
            this.router.navigateByUrl('/');
          },
          (error) => {}
        );
    } else {
      this.equalPassword = false;
      this.snackBarService.showNotification({message: 'As senhas devem ser iguais', type: 'warning'});
    }
  }
}
