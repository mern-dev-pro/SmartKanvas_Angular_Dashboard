import { Component, Input, OnInit } from '@angular/core';
import ICard from './ICard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: ICard;
  constructor() { }

  ngOnInit(): void {
  }

}
