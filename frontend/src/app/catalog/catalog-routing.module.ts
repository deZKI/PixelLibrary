import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'books/:id', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
