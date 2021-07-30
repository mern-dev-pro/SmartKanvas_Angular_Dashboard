import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('btnMenuOp', [
      state(
        'btnMenuOpen',
        style({
          opacity: '1',
          'z-index': '2',
          display: 'block'
        })
      ),
      state(
        'btnMenuClose',
        style({
          'z-index': '2',
          opacity: '0.1',
          display: 'none'
        })
      ),
      transition('btnMenuOpen => btnMenuClose', [
        animate(
          300,
          style({
            opacity: '0.1',
            display: 'block'
          })
        )
      ]),
      transition('btnMenuClose => btnMenuOpen', [
        animate(
          300,
          style({
            opacity: '1',
            display: 'none'
          })
        )
      ])
    ]),

    trigger('btnMenuCl', [
      state(
        'btnMenuOpen',
        style({
          opacity: '0.1',
          'z-index': '2',
          display: 'none'
        })
      ),
      state(
        'btnMenuClose',
        style({
          'z-index': '2',
          opacity: '1',
          display: 'block'
        })
      ),
      transition('btnMenuOpen => btnMenuClose', [
        animate(
          300,
          style({
            opacity: '1',
            display: 'none'
          })
        )
      ]),
      transition('btnMenuClose => btnMenuOpen', [
        animate(
          300,
          style({
            opacity: '0.1',
            display: 'block'
          })
        )
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @Output() animation = new EventEmitter<string>();
  @Input() isLogoOrMenu = true;
  @Input() menuType = 'menu';
  @Input() dashboardScreen = false;


  btnMenuState = 'btnMenuOpen';

  nameCutter: any;
  mySubscription = new Subject();
  assemblyId: string;
  userPhoto: string;
  userName: string;
  userEmail: string;
  userProfileName: string;
  userCooperative: string;
  userCooperativeId: number;
  userId: string;
  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();
  userLogged: any;
  initialLetters: any;

  constructor(
    public router: Router,
    private deviceService: DeviceDetectorService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.btnMenuState = 'btnMenuOpen';
  }

  ngOnInit() {
    this.getUser();
  }

  // tslint:disable-next-line: no-shadowed-variable
  alterStateMenu(state) {
    this.animation.emit(state);
    state === 'btnMenuOpen'
      ? (this.btnMenuState = 'btnMenuOpen')
      : (this.btnMenuState = 'btnMenuClose');
  }

  singOut() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    this.authService.logout(refreshToken, accessToken).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/');
      },
      (err) => {},
      () => {}
    )
  }

  getInitialNameLetters(name) {
    let [first, last ] = name.split(' ');
    first.split('');
    last.split('');
    return first[0]+last[0];
  }

  getUser() {
    const userId = localStorage.getItem('userID')
    this.userService.getUserLogged(userId).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.userLogged = this.userService.formatUser(res.data.getUserSK);
        this.initialLetters = this.getInitialNameLetters(this.userLogged.UserName);
      },
      (err) => {},
      () => {}
    )
  }


}
