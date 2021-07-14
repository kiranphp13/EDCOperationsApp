import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from 'src/app/shared/shared.module';
import {ModalModule} from 'src/app/_modal';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSpinnerModule} from 'ngx-spinner';

import {ContactsComponent} from './contacts/contacts.component';
import {ContactsRoutingModule} from './contacts-routing.module';
import {ProspectsComponent} from './prospects/prospects.component';
import {ButtonRendererComponent as ProspectsButtonRendererComponent} from './prospects/renderer/button-renderer.component';
import {AddEditComponent as ProspectAddEditComponent} from './prospects/add-edit.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ProspectsComponent,
    ProspectsButtonRendererComponent,
    ProspectAddEditComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      ProspectsButtonRendererComponent
    ]),
    NgbModule,
    SharedModule,
    ModalModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ]
})
export class ContactsModule {
}
