import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
    // this.auth.login()
  }

  contactAlert() {
    alert('Write to: vik6257@gmail.com')
  }
}
