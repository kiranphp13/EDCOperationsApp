import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams, IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-collateral-button-renderer',
  template: `

    <a *ngIf="loggedUserRole==='Admin'" class="mr-2" [routerLink]="['/administration/collaterals/edit', _id]">Edit</a>

    <a href="javascript: void(0);" class="" (click)="vRecord()">View</a>`
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
