import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";



function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

  @Component({
    selector: 'app-ad-user',
    templateUrl: './ad-user.component.html',
    styleUrls: ['./ad-user.component.css']
  })
  export class AdUserComponent implements OnDestroy, OnInit {
    private gridApi;
    private gridColumnApi;

     
    private defaultColDef;
    private defaultColGroupDef;
    private columnTypes;
    private rowData: [];
    users: User[];
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

   
    constructor(private router: Router, private apiService: AuthService, private http: HttpClient) {
      
    }

    ngOnInit() :void {
      //if (!window.localStorage.getItem('token')) {
      //  this.router.navigate(['login']);
      //  return;
      //}
      if (localStorage.getItem("currentUser") === null) {
        this.router.navigate(['login'])
      }
      else if (localStorage.getItem("currentUserRole") !== "Admin") {
        this.router.navigate(['notauthorized'])
      }
      const that = this;

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2
      };
      this.apiService.getUsers()
        .subscribe(data => {
          this.users = data;
          this.dtTrigger.next();
        });
      //this.dtOptions = {
      //  pagingType: 'full_numbers',
      //  pageLength: 2,
      //  serverSide: true,
      //  processing: true,
      //  ajax: (dataTablesParameters: any, callback) => {
      //    this.http.get<User[]>('http://localhost:58639/api/'+ 'User/GetUsers').subscribe(resp => {
      //      that.users = resp;

      //        callback({
      //          //recordsTotal: resp.recordsTotal,
      //          //recordsFiltered: resp.recordsFiltered,
      //          data: []
      //        });
      //      });
      //  },
      //  columns: [{ data: 'id' }, { data: 'fullName' }, { data: 'userName' }, { data: 'role' }, { data: 'email' }, { data: 'phone' }, { data: 'address' }, { data: 'status' }]
      //};
     
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

    addUser(): void {
      this.router.navigate(['adduser']);
    };

    onEditButtonClick(user: User) {
      //this.api.startEditingCell({
      //  rowIndex: params.rowIndex,
      //  colKey: 'make'
      localStorage.removeItem("editUserId");
      localStorage.setItem("editUserId", user.id.toString());
      this.router.navigate(['edituser']);
       
    }

    //rowData = [
    //  { make: 'Toyota', model: 'Celica', price: 35000 },
    //  { make: 'Ford', model: 'Mondeo', price: 32000 },
    //  { make: 'Porsche', model: 'Boxter', price: 72000 }
    //];


  }
