import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimelineComponent } from 'src/app/modules/management/components/timeline/timeline.component';
import { CanvasTemplate, CanvasTemplateService } from 'src/app/services/canvas-template.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-card-canvas',
  templateUrl: './card-canvas.component.html',
  styleUrls: ['./card-canvas.component.scss']
})
export class CardCanvasComponent implements OnInit {

  @Input() canvasTemplate:CanvasTemplate;
  @Input() userWorkspaceID:any;
  constructor(
    private canvasTemplateService: CanvasTemplateService,
    public dialog:MatDialog,
    private snackBarService: SnackBarService
  ) { }

  @Output() delete = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<CanvasTemplate>();
  @Output() changeIsActive = new EventEmitter<CanvasTemplate>();

  userCode:string;
  ngOnInit(): void {
    this.userCode = localStorage.getItem('userID');
  }

  changeTemplateIsActive(){
    if(this.canvasTemplate.IsActive === true ){
      this.openDeactivateDialog()
    }
    else {
      this.updateTemplateStatus();
    }
  }

  updateTemplateStatus(){
    this.canvasTemplateService.activateDeactivateCanvasTemplate(
      this.canvasTemplate.ID,
      !this.canvasTemplate.IsActive

    ).subscribe((res:any) => {
      const { IsActive } = res.data.updateCanvasTemplate;
      const messageStatus = IsActive ? 'reativado' : 'desativado';
      this.snackBarService.showNotification({
        message: `Modelo de canvas ${messageStatus} com sucesso!`,
        type: 'success'
      })
      this.changeIsActive.emit(this.canvasTemplate)
    })
  }
  deleteCanvasTemplate(){
    this.canvasTemplateService.deleteCanvasTemplate( this.canvasTemplate.ID )
      .subscribe(()=> {
        this.delete.emit();
      })
  }
  openDeactivateDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `O modelo será desativado e não poderá mais ser utilizado. Confirma a operação?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result === true) {
        this.updateTemplateStatus();
      }
    });
  }

  openDeleteDialog(template:CanvasTemplate){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Deseja criar excluir ${template.Title}?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result) this.deleteCanvasTemplate();
    });
  }

  duplicateCanvasTemplate(){
    this.duplicate.emit({...this.canvasTemplate});
  }

  showTimeline(){
    this.dialog.open(TimelineComponent,{
      width: '100%',
      maxWidth: '100%',
      data: {
        canvasTimeline: this.canvasTemplate.JSonTimeline ,
        canvasTitle: this.canvasTemplate.Title
      }
    })
  }
}
