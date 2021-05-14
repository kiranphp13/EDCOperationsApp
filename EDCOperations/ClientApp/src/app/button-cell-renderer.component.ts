import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';




@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button (click)="btnClickedHandler($event)" class="btn btn-primary" style="width:70px">{{label}}</button>

  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  private params: any;
  label: string;
  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;

  }
  constructor(private router: Router) {
    
  }
    refresh(params: ICellRendererParams): boolean {
        throw new Error('Method not implemented.');
    }
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
        throw new Error('Method not implemented.');
    }
  btnClickedHandler(params) {
    this.params.clicked(this.params.value);
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", this.params.value);
    if (this.params.screen === "EDC Users") {
      if (this.params.label === "Edit") {
        this.router.navigate(['edituser']);
      }
      else {
        this.router.navigate(['viewuser']);
      }
    }
    else  if (this.params.screen === "Contact Types") {
      this.router.navigate(['editcontacttype']);
    }
    else if (this.params.screen === "Collaterals") {
      this.router.navigate(['editcollateral']);
    }
    else if (this.params.screen === "Associations") {
      this.router.navigate(['editassociation']);
    }
    else if (this.params.screen === "EDC User Roles") {
      this.router.navigate(['edituserrole']);
    }
    else if (this.params.screen === "User Status") {
      this.router.navigate(['edituserstatus']);
    }
     
  }

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
