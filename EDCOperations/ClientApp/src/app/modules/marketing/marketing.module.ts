import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingComponent } from './marketing/marketing.component';
import {MarketingRoutingModule} from './marketing-routing.module';


@NgModule({
  declarations: [MarketingComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
