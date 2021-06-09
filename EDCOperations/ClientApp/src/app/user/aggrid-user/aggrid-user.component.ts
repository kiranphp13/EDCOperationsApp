import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";
import { ButtonRendererComponent } from 'src/app/renderer/button-renderer.component';
import { BtnCellRenderer } from 'src/app/button-cell-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';




function dateFormatter(datestring) {
  var date = new Date(datestring);
  var dateAsString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' +  date.getFullYear();
  return dateAsString;
}

var numberValueFormatter = function (params) {
  return params.value.toFixed(0);
};

var numberFilterParams = {
  buttons: ['apply', 'reset'],
  closeOnApply: true
}
var dateFilterParams = {

  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var date = new Date(cellValue);
    var dateAsString = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();

    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
  buttons: ['apply', 'reset'],
  closeOnApply: true
};

var stdFilterParams = {
  buttons: ['apply', 'reset'],
  closeOnApply: true
}



function getTextValue(cssSelector) {
  return document.querySelector(cssSelector).value;
}
function getNumericValue(cssSelector) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = 'Invalid number entered in ' + cssSelector + ' field';
    alert(message);
    throw new Error(message);
  }
  return value;
}
function myColumnWidthCallback(params) {
  var originalWidth = params.column.getActualWidth();
  if (params.index < 7) {
    return originalWidth;
  }
  return 30;
}

function getParams() {
  return {
    suppressQuotes: getValue('none'),
    columnSeparator: getValue('none'),
    //customHeader: 'none',
    //customFooter: 'none',
    columnKeys: ['fullName', 'userName', 'email', 'phone', 'address', 'role', 'status'],
    fileName:"User Details"
  };
}

function getValue(text) {
  //var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'string':
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
        'CSV file is opened in Excel because string content passed to\n' +
        'customHeader and customFooter is not escaped.'
      );
    case 'array':
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value:
                'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value: 'this cell:',
              type: 'String',
            },
            mergeAcross: 1,
          },
          {
            data: {
              value: 'is empty because the first cell has mergeAcross=1',
              type: 'String',
            },
          },
        ],
        [],
      ];
    case 'none':
      return;
    case 'tab':
      return '\t';
    case 'true':
      return true;
    case 'none':
      return;
    default:
      return text;
  }
}

@Component({
  selector: 'app-aggrid-user',
  templateUrl: './aggrid-user.component.html',
  styleUrls: ['./aggrid-user.component.css']
})
export class AggridUserComponent implements OnInit {

  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  isReader: boolean;
  public defaultColDef;
  private defaultColGroupDef;
  private columnTypes;
  private rowData: [];
  public columnDefs;
  users: User[];
  private gridApi;
  private gridColumnApi;
  isAdmin: boolean;
  searchText: string;
  public paginationPageSize;
  pageSize: string;
  constructor(private router: Router, private apiService: AuthService) {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer

    }
    this.defaultColDef = {
      resizable: true
    };
    this.pageSize = "10";

    this.paginationPageSize = 10;

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  addUser(): void {
    this.router.navigate(['adduser']);
  };


  ngOnInit() {

    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
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
  //  this.agGrid.columnApi.setColumnsVisible(['model'], false);
    //let filterInstance = this.gridOptions.api.getFilterInstance("name_col");

    if (localStorage.getItem("currentUserRole") !== "Admin") {
      this.isAdmin = false;
      this.columnDefs = [
        {
          field: 'id', width: '80', sortable: true, filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams
        },
        { field: 'fullName', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'userName', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'email', sortable: true, filter: true, width: '170', filterParams: dateFilterParams },
        { field: 'phone', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'address', sortable: true, filter: true, width: '170', filterParams: dateFilterParams },
        { field: 'role', sortable: true, filter: true, width: '100', filterParams: dateFilterParams },
        { field: 'status', sortable: true, filter: true, width: '100', filterParams: dateFilterParams },
        {
          field: 'createdDate', sortable: true, width: '150', filter: 'agDateColumnFilter', filterParams: dateFilterParams,
          cellRenderer: (data) => {
            return dateFormatter(data.value);
          }

        },
      {
        field: 'id',

        headerName: '',

        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          clicked: function (field: any) {
            //alert(`${field} was clicked`);

          },
          label: 'View',
          screen:'EDC Users'
        },
        width: 90,
      }

      ];
    }
    else {
      this.isAdmin = true;
      this.columnDefs = [{
        field: 'id', width: '80', sortable: true, filter: 'agNumberColumnFilter',
        filterParams: numberFilterParams},
        { field: 'fullName', sortable: true, filter: true, width: '120',filterParams: dateFilterParams },
        { field: 'userName', sortable: true, filter: true, width: '120',filterParams: dateFilterParams },
        { field: 'email', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'phone', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'address', sortable: true, filter: true, width: '120', filterParams: dateFilterParams },
        { field: 'role', sortable: true, filter: true, width: '100', filterParams: dateFilterParams },
        { field: 'status', sortable: true, filter: true, width: '100', filterParams: dateFilterParams },
        {
          field: 'createdDate', sortable: true, width: '150', filter: 'agDateColumnFilter', filterParams: dateFilterParams,
          cellRenderer: (data) => {
            return dateFormatter(data.value);
          }

        },
      {
        field: 'id',

        headerName: '',
        suppressColumnsToolPanel: true,
        suppressFiltersToolPanel: true,
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          clicked: function (field: any) {
            //alert(`${field} was clicked`);

          },
          label: 'Edit',
          screen: 'EDC Users'
        },
        width: 90,
      },
      {
        field: 'id',
        headerName: '',

        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          clicked: function (field: any) {
            //alert(`${field} was clicked`);
          }
          ,
          label: 'View',
          screen: 'EDC Users'
        },
        width: 90,
      }

      ];
    }




  }


  onPageSizeChanged() {
    var value = this.pageSize;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  onBtExport() {
    var params = getParams();
    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
      );
    }
    this.gridApi.exportDataAsCsv(params);
  }


  onBtSearch() {
    //gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
    this.gridApi.setQuickFilter(this.searchText);

  }



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
      localStorage.removeItem("editId");
      localStorage.setItem("editId", user.id.toString());
      this.router.navigate(['edituser']);

    }

    //rowData = [
    //  { make: 'Toyota', model: 'Celica', price: 35000 },
    //  { make: 'Ford', model: 'Mondeo', price: 32000 },
    //  { make: 'Porsche', model: 'Boxter', price: 72000 }
    //];


  }
