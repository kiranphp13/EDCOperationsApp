// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'aaapp-button-renderer',
  template: `
    

  <button class="btn btn-sm btn-primary" [routerLink]="['/contact-types/edit', _id]">Edit</button> &nbsp;
<button class="btn btn-sm btn-primary" [routerLink]="['/contact-types/edit', _id]">View</button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  _id;

  agInit(params): void {
    this.params = params;
    this._id = params["value"]["_id"];
  }

  onClick() {
    alert(this._type);
  }

  refresh(): boolean {
    return false;
  }


}
