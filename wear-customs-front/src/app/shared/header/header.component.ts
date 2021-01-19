import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  contactAlert() {
    alert('Write to: vik6257@gmail.com')
  }
}
