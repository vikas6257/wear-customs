import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from "../login/login.component";
import { FirebaseService } from "../../firebase.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public auth: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  contactAlert() {
    alert('Write to: vik6257@gmail.com')
  }
}
