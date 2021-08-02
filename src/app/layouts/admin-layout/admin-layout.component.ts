import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [
    trigger('menuState', [
      state(
        'menuOpen',
        style({
          width: '244px'
        })
      ),
      state(
        'menuClose',
        style({
          width: '70px'
        })
      ),
      transition('menuClose => menuOpen', animate('250ms ease-in')),
      transition('menuOpen => menuClose', animate('250ms ease-in'))
    ]),

    trigger('selectedItemMenuState', [
      state(
        'selectedItemMenu',
        style({
          opacity: '1',
          color: '#000',
          background: '#F0F0F0',
        })
      ),
      state(
        'noSelectedItemMenu',
        style({
          paddingLeft: '23px',
          opacity: '0.54'
        })
      )
    ]),

    trigger('hiddenTitleMenu', [
      state(
        'visibleTitle',
        style({
          opacity: '1'
        })
      ),
      state(
        'hiddenTitle',
        style({
          opacity: '0.4'
        })
      ),
      transition('visibleTitle => hiddenTitle', [
        animate(
          5000,
          style({
            opacity: '0.3',
            border: '10px solid red'
          })
        )
      ]),
      transition('hiddenTitle => visibleTitle', [
        animate(
          5000,
          style({
            opacity: '1',
            border: '10px solid red'
          })
        )
      ])
    ]),

    trigger('colorIconState', [
      state(
        'selectedItemMenu',
        style({
          color: '#54a6dc',
          'margin': '0px 24px 0px 24px'

        })
      ),
      state(
        'noSelectedItemMenu',
        style({
          color: '#7e8290'
        })
      ),
      transition('menuClose => menuOpen', animate('200ms ease-in')),
      transition('menuOpen => menuClose', animate('200ms ease-in'))
    ]),
    trigger('borderBtnSelectedState', [
      state(
        'selectedItemMenu',
        style({
          'height': '70px',
          'width': '10px',
          'background':'#54a6dc',
          'border-radius': '16px',
          'box-shadow': '1px 1px 2px 0px rgba(0, 0, 0, 0.26)',
          'margin': '0px 0px 8px 1px',
        })
      ),
      state(
        'noSelectedItemMenu',
        style({
          visibility: 'hidden'
        })
      ),
      transition('menuClose => menuOpen', animate('400ms ease-in')),
      transition('menuOpen => menuClose', animate('400ms ease-in'))
    ]),
  ]
})

export class AdminLayoutComponent implements OnInit,OnDestroy {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;
  @ViewChild('matToolbar', { static: false }) public matToolbar: HeaderComponent;
  @ViewChild(MatMenuTrigger, { static: false })
  public menuTrigger: MatMenuTrigger;
  timedOutCloser;

  btnMenuState: string;
  titleState: string;
  menuState: string;
  openSubMenuState: any;
  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger;
  mySubscription = new Subject();
  userLogged: any;
  assemblyId: string;
  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();
  mode: string;
  hasBackdrop: boolean;

  constructor(
    public router: Router,
    private activeRouter: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private menuService: MenuService
  ) {
    if (this.isMobile) {
      this.hasBackdrop = true;
      this.mode = 'over';
    }
    if (this.isTablet) {
      this.mode = 'over';
      this.hasBackdrop = true;
    }
    if (this.isDesktopDevice) {
      this.mode = 'side';
      this.hasBackdrop = false;
    }

    this.modulesList = this.openSubMenuState;
    this.btnMenuState = 'btnMenuOpen';
    this.menuState = 'menuOpen';
    this.titleState = 'visibleTitle';

    this.openSubMenuState = [
      {
        title: 'Usuários',
        state: 'noSelectedItemMenu',
        color: 'noColorItemSelected',
        visibleSub: 'off',
        icon: 'persons',
        route: `dashboard/list-user`
      },
      {
        title: 'Trabalhos',
        state: 'noSelectedItemMenu',
        color: 'noColorItemSelected',
        visibleSub: 'off',
        icon: 'work',
        route: 'dashboard/job'
      },
      {
        title: 'Modelos de Canvas',
        state: 'noSelectedItemMenu',
        color: 'noColorItemSelected',
        visibleSub: 'off',
        icon: 'space_dashboard',
        route: `dashboard/list-canvas-template`
      },

    ];
    this.checkRouteAndSelectItemMenu();
  }

  ngOnInit() {
    this.menuService.setDrawer(this.drawer);
  }
  clickCloseMenu() {
    this.matToolbar.animation.emit('btnMenuClose')
  }
  checkRouteAndSelectItemMenu() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.openSubMenuState.map((itemMenu, index) => {
          if (event.url === '/' + itemMenu.route) {
            this.openSubMenuState[index].color = 'colorItemSelected';
            this.openSubMenuState[index].state = 'selectedItemMenu';
          } else {
            this.openSubMenuState[index].color = 'noColorItemSelected';
            this.openSubMenuState[index].state = 'noSelectedItemMenu';
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.mySubscription.complete();
    this.mySubscription.next();
    // window.removeEventListener('resize',this.checkScreenWidth);
  }

  // tslint:disable-next-line: no-shadowed-variable
  alterStateMenu(state: string) {

    if (this.isMobile) {
      state === 'btnMenuOpen' ? this.drawer.toggle() : this.drawer.toggle();
    }
    if (this.isTablet) {
      state === 'btnMenuOpen' ? this.drawer.toggle() : this.drawer.toggle();
    }
    if (this.isDesktopDevice) {
      state === 'btnMenuOpen'
        ? (this.btnMenuState = 'btnMenuOpen')
        : (this.btnMenuState = 'btnMenuClose');
      state === 'btnMenuOpen'
        ? (this.menuState = 'menuOpen')
        : (this.menuState = 'menuClose');
      state === 'btnMenuOpen'
        ? (this.titleState = 'visibleTitle')
        : (this.titleState = 'hiddenTitle');
    }
  }

  selectedMenu(menu, index) {
    this.openSubMenuState.map((menuMap, indexMap) => {
      this.openSubMenuState[indexMap].state = 'noSelectedItemMenu';
      this.openSubMenuState[indexMap].visibleSub = 'off';
      this.openSubMenuState[indexMap].color = 'noColorItemSelected';
      if (index === indexMap) {
        return (
          (this.openSubMenuState[indexMap].state = 'selectedItemMenu'),
          (this.openSubMenuState[indexMap].color = 'colorItemSelected'),
          (this.openSubMenuState[indexMap].visibleSub = 'off')
        );
      }
    });

    this.navigate(menu.route);
    if (this.isTablet || this.isMobile) {
      this.drawer.toggle();
    }
    return menu;
  }

  navigate(route) {
    this.router.navigateByUrl(route);
  }

  openModal() {}
}

