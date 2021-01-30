import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ItemTypesComponent } from './items/item-types/item-types.component';
import { AddItemComponent } from "./items/add-item/add-item.component";
import { ItemsModule } from "./items/items.module";

const routes: Routes = [
  {path: 'add-item', component: AddItemComponent},
  {path: 'men_women_kids', component: ItemTypesComponent},
  {path: '', redirectTo: '/men_women_kids', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ItemsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
