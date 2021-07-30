import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardCanvasComponent } from './components/card-canvas/card-canvas.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CardWorkComponent } from './components/card-work/card-work.component';
import { HeaderComponent } from './components/header/header.component';
import { CardUsersComponent } from './components/card-users/card-users.component';
import { ModalComponent } from './components/modal/modal.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TimelineCardComponent } from './components/timeline-card/timeline-card.component';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { CardComponent } from './components/card/card.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
@NgModule({
  declarations: [
    CardCanvasComponent,
    ConfirmDialogComponent,
    CardWorkComponent,
    HeaderComponent,
    CardUsersComponent,
    ModalComponent,
    SnackBarComponent,
    TimelineCardComponent,
    TimelineItemComponent,
    CardComponent,
    ImageInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports:[
    CardCanvasComponent,
    ConfirmDialogComponent,
    CardWorkComponent,
    HeaderComponent,
    CardUsersComponent,
    ModalComponent,
    SnackBarComponent,
    TimelineCardComponent,
    TimelineItemComponent,
    CardComponent,
    ImageInputComponent
  ]
})
export class SharedModule { }
