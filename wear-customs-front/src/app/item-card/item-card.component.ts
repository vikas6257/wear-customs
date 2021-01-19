import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  numbers: any
  constructor() {
    this.numbers = Array(100).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
