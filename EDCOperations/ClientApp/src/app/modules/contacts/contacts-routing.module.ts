import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {ProspectsComponent} from './prospects/prospects.component';
import {AddEditComponent as ProspectAddEditComponent} from './prospects/add-edit.component';
import {AuthGuard} from '../../shared/auth.guard';

const routes: Routes = [

  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin', 'Editor']
    }
  },
  {
    path: 'contacts/prospects',
    component: ProspectsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin', 'Editor']
    }
  },
  {
    path: 'contacts/prospects/add',
    component: ProspectAddEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'contacts/prospects/edit/:id',
    component: ProspectAddEditComponent,
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
export class ContactsRoutingModule {
}
