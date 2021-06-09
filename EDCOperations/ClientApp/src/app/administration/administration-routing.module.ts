import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactTypesComponent } from './contact-types/contact-types.component';
import { AddEditComponent } from './contact-types/add-edit.component';

import { CollateralsComponent } from './collaterals/collaterals.component';
import { AssociationsComponent } from './associations/associations.component';

const routes: Routes = [
  { path: 'administration/contact-types', component: ContactTypesComponent },
  { path: 'administration/contact-types/add', component: AddEditComponent },
  { path: 'administration/contact-types/edit/:id', component: AddEditComponent },
  { path: 'administration/collaterals', component: CollateralsComponent },
  { path: 'administration/associations', component: AssociationsComponent },
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
