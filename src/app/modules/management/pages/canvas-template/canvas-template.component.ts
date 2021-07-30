import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CanvasTemplate, CanvasTemplateService } from 'src/app/services/canvas-template.service';
import { MatDialog } from '@angular/material/dialog';
import { CanvasTemplateFormComponent } from '../../components/canvas-template-form/canvas-template-form.component';
@Component({
  selector: 'app-canvas-template',
  templateUrl: './canvas-template.component.html',
  styleUrls: ['./canvas-template.component.scss']
})
export class CanvasTemplateComponent implements OnInit {

  canvasTemplate: CanvasTemplate;
  boxes = [
    {
      "title":"Box title 1",
      "description": "Description of box 1",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    },
    {
      "title":"Box title 2",
      "description": "Description of box 2",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    },
    {
      "title":"Box title 3",
      "description": "Description of box 3",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    },
    {
      "title":"Box title 4",
      "description": "Description of box 4",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    },
    {
      "title":"Box title 5",
      "description": "Description of box 5",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    },
    {
      "title":"Box title 6",
      "description": "Description of box 6",
      "icon":"book",
      "box-bgcolor":"#AADDAD",
      "sizeX":"1",
      "sizeY":"1"
    }
  ]

  constructor(
    private canvasTemplateService: CanvasTemplateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.canvasTemplateService.getCanvasTemplate(id).subscribe((result:any) => {
        this.canvasTemplate = result.data.getCanvas;
      })
    }

    if(!id) this.openModal();

  }

  backToList(){
    this.router.navigateByUrl('dashboard/list-canvas-template');
  }

  openModal():void{
    const dialogRef = this.dialog.open(CanvasTemplateFormComponent, {
      width: '600px',
      data: this.canvasTemplate
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.canvasTemplate = result.updateCanvasTemplate;
    })
  }
}
