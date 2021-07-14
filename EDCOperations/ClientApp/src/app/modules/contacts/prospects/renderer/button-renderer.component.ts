import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-renderer',
  template: `
  <a *ngIf="loggedUserRole==='Admin'" class="mr-2" [routerLink]="['/prospects/edit', _id]">Edit</a>

  <a href="javascript: void(0);" class="" (click)="vRecord()">View</a>
  `,
  styles: []
})
export class ButtonRendererComponent implements OnInit {

  constructor() { }
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
    //alert('test');
  }
  ngOnInit() {
  }

}
