import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { ShowItemsComponent } from './show-items/show-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemTypesComponent } from './item-types/item-types.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [AddItemComponent, ShowItemsComponent, ItemDetailsComponent, ItemTypesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ItemsModule { }
