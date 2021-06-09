import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams, IAfterGuiAttachedParams} from 'ag-grid-community';

@Component({
  selector: 'app-c-type-button-renderer',
  template: `
    <button class="btn btn-sm btn-primary" [routerLink]="['/contact-types/edit', _id]">Edit</button> &nbsp;
    <button class="btn btn-sm btn-primary" (click)="vRecord()">View</button>`
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  _id;
  componentParent: any;

  agInit(params): void {
    this.params = params;
    this._id = params['value']['_id'];
    this.componentParent = this.params.context.componentParent;
  }

  onClick() {
  }

  refresh(): boolean {
    return false;
  }

  vRecord(){
    this.componentParent.viewRecord(this._id);
    //alert('test');
  }
}
