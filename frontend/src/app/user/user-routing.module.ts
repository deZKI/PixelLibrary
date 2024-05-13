import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {OrdersComponent} from "./orders/orders.component";
import {PaymentComponent} from "./payment/payment.component";
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {path: 'payments', component: PaymentComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'logout', component: LogoutComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
