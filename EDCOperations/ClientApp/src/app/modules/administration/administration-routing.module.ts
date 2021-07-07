import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth.guard';

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
import {AddEditComponent as SourceAddEditComponent} from './source/add-edit.component';

import {ContactCategoryComponent} from './contact-category/contact-category.component';
import {AddEditComponent as ContactCategoryAddEditComponent} from './contact-category/add-edit.component';


const routes: Routes = [
  {
    path: 'administration/edc-users',
    component: EdcusersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/edc-users/add',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/edc-users/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },

  {
    path: 'administration/contact-types',
    component: ContactTypesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin', 'Editor', 'Reader']
    }
  },
  {
    path: 'administration/contact-types/add',
    component: ContactTypeAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/contact-types/edit/:id',
    component: ContactTypeAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },

  {
    path: 'administration/collaterals',
    component: CollateralsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin', 'Editor', 'Reader']
    }
  },
  {
    path: 'administration/collaterals/add',
    component: CollateralAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/collaterals/edit/:id',
    component: CollateralAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },

  {
    path: 'administration/associations',
    component: AssociationsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin', 'Editor', 'Reader']
    }
  },
  {
    path: 'administration/associations/add',
    component: AssociationAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/associations/edit/:id',
    component: AssociationAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },

  {
    path: 'administration/user-roles',
    component: UserRolesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/user-roles/add',
    component: UserRoleAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/user-roles/edit/:id',
    component: UserRoleAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },

  {
    path: 'administration/user-statuses',
    component: UserStatusesComponent,
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/user-statuses/add',
    component: UserStatusAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/user-statuses/edit/:id',
    component: UserStatusAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },

  {
    path: 'administration/source',
    component: SourceComponent,
    data: {
      roles: ['Admin', 'Editor', 'Reader']
    }
  },
  {
    path: 'administration/source/add',
    component: SourceAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/source/edit/:id',
    component: SourceAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Editor']
    }
  },
  {
    path: 'administration/contact-category',
    component: ContactCategoryComponent,
    data: {
      roles: ['Admin', 'Editor', 'Reader']
    }
  },
  {
    path: 'administration/contact-category/add',
    component: ContactCategoryAddEditComponent,
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'administration/contact-category/edit/:id',
    component: ContactCategoryAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },
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
