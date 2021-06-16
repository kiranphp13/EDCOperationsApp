import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// 1 Users
import {EdcusersComponent} from './edcusers/edcusers.component';
import {AddUserComponent} from './edcusers/add-user/add-user.component';
import {EditUserComponent} from './edcusers/edit-user/edit-user.component';

// 2 Contact Type
import {ContactTypesComponent} from './contact-types/contact-types.component';
import {AddEditComponent as ContactTypeAddEditComponent} from './contact-types/add-edit.component';

// 3 Collaterals
import {CollateralsComponent} from './collaterals/collaterals.component';
import {AddEditComponent as CollateralAddEditComponent} from './collaterals/add-edit.component';

// 4 Association
import {AssociationsComponent} from './associations/associations.component';
import {AddEditComponent as AssociationAddEditComponent} from './associations/add-edit.component';

// 5 User Role
import {UserRolesComponent} from './user-roles/user-roles.component';
import {AddEditComponent as UserRoleAddEditComponent} from './user-roles/add-edit.component';

// 6 User Status
import {UserStatusesComponent} from './user-statuses/user-statuses.component';
import {AddEditComponent as UserStatusAddEditComponent} from './user-statuses/add-edit.component';

import {SourceComponent} from './source/source.component';
import {ContactCategoryComponent} from './contact-category/contact-category.component';

const routes: Routes = [
  {path: 'administration/edc-users', component: EdcusersComponent},
  {path: 'administration/edc-users/add', component: AddUserComponent},
  {path: 'administration/edc-users/edit/:id', component: EditUserComponent},

  {path: 'administration/contact-types', component: ContactTypesComponent},
  {path: 'administration/contact-types/add', component: ContactTypeAddEditComponent},
  {path: 'administration/contact-types/edit/:id', component: ContactTypeAddEditComponent},

  {path: 'administration/collaterals', component: CollateralsComponent},
  {path: 'administration/collaterals/add', component: CollateralAddEditComponent},
  {path: 'administration/collaterals/edit/:id', component: CollateralAddEditComponent},

  {path: 'administration/associations', component: AssociationsComponent},
  {path: 'administration/associations/add', component: AssociationAddEditComponent},
  {path: 'administration/associations/edit/:id', component: AssociationAddEditComponent},

  {path: 'administration/user-roles', component: UserRolesComponent},
  {path: 'administration/user-roles/add', component: UserRoleAddEditComponent},
  {path: 'administration/user-roles/edit/:id', component: UserRoleAddEditComponent},

  {path: 'administration/user-statuses', component: UserStatusesComponent},
  {path: 'administration/user-statuses/add', component: UserStatusAddEditComponent},
  {path: 'administration/user-statuses/edit/:id', component: UserStatusAddEditComponent},

  {path: 'administration/source', component: SourceComponent},
  {path: 'administration/contact-category', component: ContactCategoryComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministrationRoutingModule {
}
