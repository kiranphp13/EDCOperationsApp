import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProcessingComponent } from './order-processing/order-processing.component';
import {OrderProcessingRoutingModule} from './order-processing-routing.module';


@NgModule({
  declarations: [OrderProcessingComponent],
  imports: [
    CommonModule,
    OrderProcessingRoutingModule
  ]
})
export class OrderProcessingModule { }
