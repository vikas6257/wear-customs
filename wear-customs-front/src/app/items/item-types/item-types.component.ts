import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-types',
  templateUrl: './item-types.component.html',
  styleUrls: ['./item-types.component.css']
})
export class ItemTypesComponent implements OnInit {
  numbers: any

  constructor() {
    this.numbers = Array(100).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
