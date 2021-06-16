import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams, IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-c-type-button-renderer',
  template: `
    <a *ngIf="loggedUserRole ==='Admin'" class="mr-2" [routerLink]="['/administration/edc-users/edit', _id]">Edit</a>
    <a class="" href="javascript: void(0);" (click)="vRecord()">View</a>
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
