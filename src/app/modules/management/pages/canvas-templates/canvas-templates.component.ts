import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CanvasTemplateService, CanvasTemplate } from 'src/app/services/canvas-template.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-canvas-templates',
  templateUrl: './canvas-templates.component.html',
  styleUrls: ['./canvas-templates.component.scss']
})
export class CanvasTemplatesComponent implements OnInit {

  searchInput = '';
  canvasTemplates:CanvasTemplate[];
  filteredCanvasTemplates:CanvasTemplate[];
  searchedCanvasTemplates:CanvasTemplate[];
  showCanvasTemplates:CanvasTemplate[];
  noTitleName = 'Sem Título';
  duplicateDialogOpen = false;
  user:any;
  workspaceID:any;
  userWorkspaceID:any;
  lastSearchInputValue = '';

  filterActive = true;
  filterInactive = true;
  filterStandard = true;
  filterWorkspace = true;

  constructor(
    private canvasTemplateService:CanvasTemplateService,
    private userService:UserService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.getUser();
    this.getCanvasTemplates();
  }

  async getUser() {
    const userId = localStorage.getItem('userID')
    const res = <any>await this.userService.getUserLogged(userId).pipe(
      take(1)
    ).toPromise()

    this.user = this.userService.formatUser(res.data.getUserSK);
    this.workspaceID = this.user.workspaces[0].ID;
    this.userWorkspaceID = this.user.userWorkspaces[0].ID;
  }

  getCanvasTemplates(){
    this.canvasTemplateService.getCanvasByWorkspaceID(this.workspaceID).subscribe((result:any) => {
      this.canvasTemplates = this.canvasTemplateService
        .formatCanvasTemplates(result.data.getCanvasByWorkspaceID);
      this.showCanvasTemplates = [...this.canvasTemplates];
      this.filteredCanvasTemplates = [...this.canvasTemplates];
    })
  }

  refreshTemplates(){
    this.getCanvasTemplates();
  }

  defineCopyName():string{
    const noTitleTemplates:CanvasTemplate[] = this.filterNoTitleTemplates();

    if(noTitleTemplates.length === 0 ) return this.noTitleName;

    const missingNoTitle = this.findMissingNoTitle(noTitleTemplates);
    return missingNoTitle;
  }

  findMissingNoTitle(noTitleTemplates:CanvasTemplate[]){
    if(!noTitleTemplates.find(
      (template:CanvasTemplate) =>  this.findNoTitle(this.noTitleName, template)
    )) {
      return this.noTitleName;
    }

    for(let i=1; i < noTitleTemplates.length; i++){
      const title = `${this.noTitleName} (${i})`
      if(!noTitleTemplates.find(
        (template:CanvasTemplate) => this.findNoTitle(title, template)
      )) {
        return title;
      }
    }

    return `${this.noTitleName} (${noTitleTemplates.length})`
  }

  includesNoTitle(title:string,template:CanvasTemplate):boolean{
    return template.Title.includes(title);
  }

  findNoTitle(title:string,template:CanvasTemplate):boolean{
    return template.Title === title;
  }
  filterNoTitleTemplates():CanvasTemplate[]{
    return this.canvasTemplates.filter(
      (template:CanvasTemplate) => this.includesNoTitle(this.noTitleName, template)
    );
  }

  openDuplicateDialog(template:CanvasTemplate){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Deseja criar uma cópia de ${template.Title}?`
      }
    })
    dialogRef.afterClosed().subscribe((result:any)=> {
      if(result) this.duplicateCanvasTemplate(template);
    });
  }
  duplicateCanvasTemplate(template:CanvasTemplate){
    const newTemplate = {
      Title: this.defineCopyName(),
      Description: template.Description
    }

    this.canvasTemplateService.createCanvasTemplate(
      newTemplate,
      this.user.ID,
      this.workspaceID
    ).subscribe((result:any) => {
      this.getCanvasTemplates();
    })
  }
  changesCanvasTemplateIsActive(template:CanvasTemplate){
    this.refreshTemplates();
  }

  filterTemplates(){
    this.filteredCanvasTemplates = [...this.canvasTemplates];

    if(this.filterActive == false){
      this.filteredCanvasTemplates = this.RemoveNotActiveTemplates(this.filteredCanvasTemplates);
    }

    if(this.filterInactive == false){
      this.filteredCanvasTemplates = this.RemoveNotInactiveTemplates(this.filteredCanvasTemplates);
    }

    if(this.filterWorkspace == false){
      this.filteredCanvasTemplates = this.RemoveNotWorkspaceTemplates(this.filteredCanvasTemplates);
    }

    if(this.filterStandard == false){
      this.filteredCanvasTemplates = this.RemoveNotStandardTemplates(this.filteredCanvasTemplates);
    }

    this.showCanvasTemplates = [...this.filteredCanvasTemplates];

    if(this.lastSearchInputValue) {
      this.searchCanvasTemplate(true);
    }

  }

  checkEqual(template1:CanvasTemplate, template2:CanvasTemplate):boolean{
    return (
      template1.ID === template2.ID &&
      template1.Title === template2.Title &&
      template1.Description === template2.Description &&
      template1.IsActive === template2.IsActive &&
      template1.WorkspaceCode === template2.WorkspaceCode
    )
  }

  RemoveNotActiveTemplates(templates:CanvasTemplate[]):CanvasTemplate[]{
    return templates.filter(template => template.IsActive == false)
  }

  RemoveNotInactiveTemplates(templates:CanvasTemplate[]):CanvasTemplate[]{
    return templates.filter(template => template.IsActive == true)
  }

  RemoveNotStandardTemplates(templates:CanvasTemplate[]):CanvasTemplate[]{
    return templates.filter(
      template => template.WorkspaceCode == this.workspaceID
    );
  }

  RemoveNotWorkspaceTemplates(templates:CanvasTemplate[]):CanvasTemplate[]{
    return templates.filter(
      template => template.WorkspaceCode != this.workspaceID
    );
  }

  searchCanvasTemplate(autoSearch = false){
    this.showCanvasTemplates = [...this.filteredCanvasTemplates];

    const templateSearchProperties = ['Title', 'Description'];
    const search = autoSearch ? this.lastSearchInputValue :
      <string>this.searchInput.toLowerCase();

    this.searchedCanvasTemplates = this.showCanvasTemplates.filter(
      (template:CanvasTemplate) => this.applySearchFilter(
        template, templateSearchProperties, search
      )
    );

    this.lastSearchInputValue = search;
    this.showCanvasTemplates = [...this.searchedCanvasTemplates];
  }

  applySearchFilter(
    template:CanvasTemplate,
    templateSearchProperties:string[],
    search:string
  ){
    for(let templateProp of templateSearchProperties){
      if(template[templateProp].toLowerCase().includes(search)) return true;
      if(template.IsActive && 'ativo'.includes(search)) return true;
      if(!template.IsActive && 'inativo'.includes(search)) return true;
    }

    return false;
  }

  clearSearch(){
    this.searchInput = '';
    this.searchCanvasTemplate();
  }
}
