import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundLayoutComponent } from './not-found-layout.component';



@NgModule({
  declarations: [NotFoundLayoutComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ]
})
export class NotFoundLayoutModule { }
