import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactTypesComponent } from './contact-types/contact-types.component';
import { AddEditComponent } from './contact-types/add-edit.component';

const routes: Routes = [
  { path: 'contact-types', component: ContactTypesComponent },
  { path: 'contact-types/add', component: AddEditComponent },
  { path: 'contact-types/edit/:id', component: AddEditComponent }
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
