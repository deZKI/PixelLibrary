import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card/book-card.component';
import { CatalogComponent } from './catalog/catalog.component';
import {CatalogRoutingModule} from "./catalog-routing.module";
import {MatIcon} from "@angular/material/icon";
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import {CommentListComponent} from "../components/comment-list/comment-list.component";
import { BookPurchaseCardComponent } from './book-purchase-card/book-purchase-card.component';
import {CommentFormComponent} from "../components/comment-form/comment-form.component";
import {CommentComponent} from "../components/comment/comment.component";



@NgModule({
    declarations: [
        BookCardComponent,
        CatalogComponent,
        BookListComponent,
        BookComponent,
        BookPurchaseCardComponent,
    ],
    exports: [
        BookListComponent
    ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatIcon,
    CommentListComponent,
    CommentFormComponent,
    CommentComponent,
  ]
})
export class CatalogModule { }
