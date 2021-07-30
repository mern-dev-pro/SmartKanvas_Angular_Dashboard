import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CanvasTemplate, CanvasTemplateService } from 'src/app/services/canvas-template.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-canvas-template-form',
  templateUrl: './canvas-template-form.component.html',
  styleUrls: ['./canvas-template-form.component.scss']
})
export class CanvasTemplateFormComponent implements OnInit {

  canvasTemplateForm:FormGroup;
  isNew:boolean;

  constructor(
    private canvasTemplateService:CanvasTemplateService,
    private globalService: GlobalDataService,
    public dialogRef: MatDialogRef<CanvasTemplateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CanvasTemplate,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isNew = !this.data;

    this.canvasTemplateForm = new FormGroup({
      'Title': new FormControl(
        this.data ? this.data.Title : null,
        !this.data && Validators.required
      ),
      'Description': new FormControl(
        this.data ? this.data.Description : null,
        !this.data && Validators.required
      )
    })
  }

  onSubmit(){
    if(this.isNew){
      this.canvasTemplateService.createCanvasTemplate(
        this.canvasTemplateForm.value,
        this.globalService.loggedUser.ID,
        localStorage.getItem('workspaceId')
      )
        .subscribe((result: any) => {
          if(result.data){
            this.router.navigateByUrl(
              '/dashboard/canvas-template/edit/'+result.data.createCanvasTemplate.ID
            )
          }

          this.closeModal();
        })
    }
    else {
      const canvasValue = this.canvasTemplateForm.value;
      let newCanvasTemplate:any = {
        Description: canvasValue.Description
      };

      if(canvasValue.Title !== this.data.Title) {
        newCanvasTemplate.Title = canvasValue.Title
      }

      this.canvasTemplateService.updateCanvasTemplate(
        this.data.ID,
        newCanvasTemplate

      )
        .subscribe( (result:any) => {
          this.closeModal(result.data)
        }
      )
    }

  }

  closeModal(data = null){
    this.dialogRef.close(data)
  }
}
