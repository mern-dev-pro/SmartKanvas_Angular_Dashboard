import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {

  token: string;
  tokenIsValid: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private globalDataService: GlobalDataService
  ) {
    this.token = this.authService.getToken();
  }

  async canActivate() {

    // this.authService.tokenIsValid(this.token);
    if (this.authService.isLogged(this.token) !== false) {
      await this.globalDataService.setFormatedUser();
      return true;
    }
    this.snackBarService.showNotification({message:'Sessão expirou', type: 'warning'});
    this.router.navigate(['login']);
    return false;
  }

}
