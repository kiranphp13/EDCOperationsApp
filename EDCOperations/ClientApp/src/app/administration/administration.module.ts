import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactTypesComponent } from './contact-types/contact-types.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddEditComponent } from './contact-types/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './contact-types/renderer/button-renderer.component';

@NgModule({
  declarations: [ContactTypesComponent, AddEditComponent, ButtonRendererComponent],
  imports: [
    AdministrationRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ]
})
export class AdministrationModule { }
