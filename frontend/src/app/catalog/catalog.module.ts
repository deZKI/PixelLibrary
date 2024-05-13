import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { CatalogComponent } from './catalog/catalog.component';
import {CatalogRoutingModule} from "./catalog-routing.module";
import {MatIcon} from "@angular/material/icon";
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import {CommentListComponent} from "../components/comment-list/comment-list.component";



@NgModule({
  declarations: [
    BookCardComponent,
    CatalogComponent,
    BookListComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatIcon,
    CommentListComponent,
  ]
})
export class CatalogModule { }
