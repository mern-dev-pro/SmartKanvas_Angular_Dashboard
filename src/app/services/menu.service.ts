import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private drawer: MatDrawer;

  /**
   * setDrawer
   */
  setDrawer(flyout: MatDrawer) {
    this.drawer = flyout;
  }

  /**
   * open
   */
  open() {
    return this.drawer.open();
  }

  /**
   * close
   */
  close() {
    return this.drawer.close();
  }

  /**
   * toggle
   */
  toggle(): void {
    this.drawer.toggle();
  }
}
