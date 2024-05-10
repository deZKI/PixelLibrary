import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { CatalogComponent } from './catalog/catalog.component';
import {CatalogRoutingModule} from "./catalog-routing.module";
import {MatIcon} from "@angular/material/icon";
import { BookListComponent } from './book-list/book-list.component';



@NgModule({
  declarations: [
    BookCardComponent,
    CatalogComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatIcon
  ]
})
export class CatalogModule { }
