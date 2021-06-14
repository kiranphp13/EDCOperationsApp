import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactTypesComponent} from './contact-types/contact-types.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AddEditComponent} from './contact-types/add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// ag-grid
import {AgGridModule} from 'ag-grid-angular';
import {ButtonRendererComponent} from './contact-types/renderer/button-renderer.component';
import {ButtonRendererComponent as EDCUsersButtonRendererComponent} from './edcusers/renderer/button-renderer.component';
import {CollateralsComponent} from './collaterals/collaterals.component';
import {AssociationsComponent} from './associations/associations.component';
import {EdcusersComponent} from './edcusers/edcusers.component';
import {AddUserComponent} from './edcusers/add-user/add-user.component';
import {EditUserComponent} from './edcusers/edit-user/edit-user.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ModalModule} from 'src/app/_modal';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [ContactTypesComponent,
    AddEditComponent,
    ButtonRendererComponent, EDCUsersButtonRendererComponent,
    CollateralsComponent, AssociationsComponent,
    EdcusersComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    AdministrationRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent, EDCUsersButtonRendererComponent]),
    NgbModule,
    SharedModule,
    ModalModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ]
})
export class AdministrationModule {
}
