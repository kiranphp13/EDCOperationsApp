import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderProcessingComponent} from './order-processing/order-processing.component';

const routes: Routes = [
  {path: 'order-processing', component: OrderProcessingComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderProcessingRoutingModule {
}
