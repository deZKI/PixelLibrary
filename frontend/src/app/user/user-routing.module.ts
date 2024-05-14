import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {OrdersComponent} from "./orders/orders.component";
import {PaymentComponent} from "./payment/payment.component";
import {PersonalComponent} from "./personal/personal.component";
import {AuthGuard} from "../auth.guard";


const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {path: '', component: PersonalComponent},
      {path: 'payments', component: PaymentComponent},
      {path: 'orders', component: OrdersComponent},
    ], canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
