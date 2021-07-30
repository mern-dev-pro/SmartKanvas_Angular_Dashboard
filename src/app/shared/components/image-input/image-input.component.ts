import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  @Output() openInputFile = new EventEmitter<any>();
  @Input() imagePath:string;
  constructor() { }

  ngOnInit(): void {
  }


  clickEdit(){
    this.openInputFile.emit();
  }
}
