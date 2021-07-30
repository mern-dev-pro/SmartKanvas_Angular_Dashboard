import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {IosInstallComponent} from "./modules/shared/ios-install/ios-install.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smartkanvas-front';
  langs = ['en', 'pt-br'];

  constructor(private translateService: TranslateService, private toast: MatSnackBar) {
  }

  public ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translateService.setDefaultLang(browserlang);
    } else {
      this.translateService.setDefaultLang('pt-br');
    }

    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iPhone|iphone|ipad|ipod/.test(userAgent);
    }
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

    if (isIos() && !isInStandaloneMode()) {
      this.toast.openFromComponent(IosInstallComponent, {
        duration: 8000,
        horizontalPosition: 'start',
        panelClass: ['mat-elevation-z3']
      });
    }
  }


  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}
