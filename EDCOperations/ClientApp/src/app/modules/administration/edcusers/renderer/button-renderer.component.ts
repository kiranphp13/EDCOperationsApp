import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams, IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-c-type-button-renderer',
  template: `
    <button *ngIf="loggedUserRole ==='Admin'" class="btn btn-sm btn-link" [routerLink]="['/administration/edc-users/edit', _id]">Edit</button>
    <button class="btn btn-sm btn-link" (click)="vRecord()">View</button>
  `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  _id;
  componentParent: any;
  loggedUserRole;
  agInit(params): void {
    this.params = params;
    this._id = params['value']['_id'];
    this.componentParent = this.params.context.componentParent;
    this.loggedUserRole = this.componentParent.getUserRoleName();

  }

  onClick() {
  }

  refresh(): boolean {
    return false;
  }

  vRecord() {
    this.componentParent.viewRecord(this._id);
  }
}
