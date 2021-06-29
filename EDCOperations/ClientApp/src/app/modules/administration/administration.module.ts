import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationRoutingModule} from './administration-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from 'src/app/shared/shared.module';
import {ModalModule} from 'src/app/_modal';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSpinnerModule} from 'ngx-spinner';


// 1 Users
import {EdcusersComponent} from './edcusers/edcusers.component';
import {AddUserComponent} from './edcusers/add-user/add-user.component';
import {EditUserComponent} from './edcusers/edit-user/edit-user.component';
import {ButtonRendererComponent as EDCUsersButtonRendererComponent} from './edcusers/renderer/button-renderer.component';

// 2 Contact Type
import {ContactTypesComponent} from './contact-types/contact-types.component';
import {AddEditComponent as ContactTypeAddEditComponent} from './contact-types/add-edit.component';
import {ButtonRendererComponent as ContactTypeButtonRendererComponent} from './contact-types/renderer/button-renderer.component';

// 3 Collateral
import {CollateralsComponent} from './collaterals/collaterals.component';
import {AddEditComponent as CollateralAddEditComponent} from './collaterals/add-edit.component';
import {ButtonRendererComponent as CollateralsButtonRendererComponent} from './collaterals/renderer/button-renderer.component';


// 4 Association
import {AssociationsComponent} from './associations/associations.component';
import {AddEditComponent as AssociationAddEditComponent} from './associations/add-edit.component';
import {ButtonRendererComponent as AssociationsButtonRendererComponent} from './associations/renderer/button-renderer.component';

// 5 User Role
import {UserRolesComponent} from './user-roles/user-roles.component';
import {AddEditComponent as UserRoleAddEditComponent} from './user-roles/add-edit.component';
import {ButtonRendererComponent as UserRoleButtonRendererComponent} from './user-roles/renderer/button-renderer.component';

// 6 User Status
import {UserStatusesComponent} from './user-statuses/user-statuses.component';
import {AddEditComponent as UserStatusAddEditComponent} from './user-statuses/add-edit.component';
import {ButtonRendererComponent as UserStatusButtonRendererComponent} from './user-statuses/renderer/button-renderer.component';
import { SourceComponent } from './source/source.component';
import {ButtonRendererComponent as SourceButtonRendererComponent} from './source/renderer/button-renderer.component';
import {AddEditComponent as SourceAddEditComponent} from './source/add-edit.component';

import { ContactCategoryComponent } from './contact-category/contact-category.component';
import {ButtonRendererComponent as ContactCategoryRendererComponent} from './contact-category/renderer/button-renderer.component';
import {AddEditComponent as ContactCategoryAddEditComponent} from './contact-category/add-edit.component';

@NgModule({
  declarations: [
    EdcusersComponent,
    AddUserComponent,
    EditUserComponent,
    EDCUsersButtonRendererComponent,
    ContactTypesComponent,
    ContactTypeAddEditComponent,
    ContactTypeButtonRendererComponent,
    CollateralsButtonRendererComponent,
    AssociationsButtonRendererComponent,
    CollateralsComponent,
    CollateralAddEditComponent,
    AssociationsComponent,
    AssociationAddEditComponent,
    UserRolesComponent,
    UserRoleAddEditComponent,
    UserRoleButtonRendererComponent,
    UserStatusesComponent,
    UserStatusAddEditComponent,
    UserStatusButtonRendererComponent,
    SourceComponent,
    SourceButtonRendererComponent,
    SourceAddEditComponent,
    ContactCategoryComponent,
    ContactCategoryAddEditComponent,
    ContactCategoryRendererComponent
  ],
  imports: [
    AdministrationRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      EDCUsersButtonRendererComponent,
      ContactTypeButtonRendererComponent,
      CollateralsButtonRendererComponent,
      AssociationsButtonRendererComponent,
      UserRoleButtonRendererComponent,
      UserStatusButtonRendererComponent,
      SourceButtonRendererComponent,
      ContactCategoryRendererComponent
    ]),
    NgbModule,
    SharedModule,
    ModalModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ]
})
export class AdministrationModule {
}
