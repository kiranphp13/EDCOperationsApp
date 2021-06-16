import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams, IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-collateral-button-renderer',
  template: `

    <span class="mr-2" *ngIf="loggedUserRole==='Admin'"><a [routerLink]="['/administration/user-roles/edit', _id]">Edit</a>&nbsp;</span>

    <a href="javascript: void(0);" (click)="vRecord()">View</a>`
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

    this.loggedUserRole = localStorage.getItem('currentUserRole');

  }

  onClick() {
  }

  refresh(): boolean {
    return false;
  }

  vRecord() {
    this.componentParent.viewRecord(this._id);
    //alert('test');
  }
}
