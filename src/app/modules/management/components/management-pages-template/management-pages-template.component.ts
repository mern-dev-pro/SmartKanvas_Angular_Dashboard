import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-management-pages-template',
  templateUrl: './management-pages-template.component.html',
  styleUrls: ['./management-pages-template.component.scss']
})
export class ManagementPagesTemplateComponent implements OnInit {

  @Input() pageTitle:string;
  @Input() hasSwitchListType:boolean = false;

  @Output() search = new EventEmitter<string>();
  @Output() addClick = new EventEmitter<string>();
  @Output() switchListType = new EventEmitter<string>();
  searchInput = '';

  activeListType = 'grid';
  showCloseSearch = false;
  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(){
    this.addClick.emit();
  }
  onSearch(){
    this.search.emit(this.searchInput)
  }
  clearSearch(){
    this.searchInput = '';
    this.search.emit(this.searchInput)
  }

  changeActiveListType(type: string){
    this.activeListType = type;
    this.switchListType.emit(type);
  }

  showClose(){
    this.showCloseSearch = true;
  }
}
