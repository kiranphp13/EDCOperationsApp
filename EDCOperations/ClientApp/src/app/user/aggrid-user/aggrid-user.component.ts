import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";
import { ButtonRendererComponent } from 'src/app/renderer/button-renderer.component';
import { BtnCellRenderer } from 'src/app/button-cell-renderer.component';


  @Component({
    selector: 'app-aggrid-user',
    templateUrl: './aggrid-user.component.html',
    styleUrls: ['./aggrid-user.component.css']
  })
  export class AggridUserComponent implements OnInit {
 
    frameworkComponents: any;
    rowDataClicked1 = {};
    rowDataClicked2 = {};
     
    private defaultColDef;
    private defaultColGroupDef;
    private columnTypes;
    private rowData: [];
    users: User[];
    constructor(private router: Router, private apiService: AuthService) {
      this.frameworkComponents = {
        btnCellRenderer: BtnCellRenderer

      }
      this.defaultColDef = { resizable: true };

    }

    addUser(): void {
      this.router.navigate(['adduser']);
    };
    ngOnInit() {
      
      if (localStorage.getItem("currentUser") === null) {
        this.router.navigate(['login'])
      }
      else if (localStorage.getItem("currentUserRole") !== "Admin") {
        this.router.navigate(['notauthorized'])
      }
      this.apiService.getUsers()
        .subscribe(data => {
          this.users = data;
        });
      //var gridOptions = {
      //  defaultColDef: {
      //    resizable: true,
      //  },
      //  columnDefs: columnDefs,
      //  rowData: null,
      //  onColumnResized: function (params) {
      //    console.log(params);
      //  },
      //};

      
    }

    columnDefs = [{ field: 'id', width: '80' },
    { field: 'fullName', sortable: true, filter: true, width: '150' },
    { field: 'userName', sortable: true, filter: true, width: '120' },
    { field: 'role', sortable: true, filter: true, width: '100' },
    { field: 'email', sortable: true, filter: true, width: '150' },
    { field: 'phone', sortable: true, filter: true, width: '120' },
    { field: 'address', sortable: true, filter: true, width: '150' },
    {
      field: 'id',
      headerName: 'Edit',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function (field: any) {
          //alert(`${field} was clicked`);

        },
        label: 'Edit'
      },
      width: 90,
    },
    {
      field: 'id',
      headerName: 'View',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function (field: any) {
          //alert(`${field} was clicked`);
        }
        ,
        label: 'View'
      },
      width: 90,
    }

    ];


   
    onBtnClick1(e) {
      this.rowDataClicked1 = e.rowData;
    }

    onBtnClick2(e) {
      this.rowDataClicked2 = e.rowData;
    }
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
