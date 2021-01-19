import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  userAuthenticated() {
    return this.auth.authenticated;
  }
}
