import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRoleService} from '../services/user-role.service';
import {ButtonRendererComponent} from './renderer/button-renderer.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {UserService} from 'src/app/shared/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
  providers: [DatePipe]
})
export class UserRolesComponent implements OnInit {
  // @ts-ignore
  @ViewChild('view_record', {}) viewRecordElmRef: ElementRef;
  records;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private rowData: any;
  frameworkComponents: any;
  closeResult = '';
  context: any;
  pageSize = 10;
  _record;
  loggedUserRole;

  constructor(
    private http: HttpClient,
    private userRoleService: UserRoleService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private userService: UserService,
    private spinnerService: NgxSpinnerService
  ) {

    this.loggedUserRole = this.userService.getloggedUserRole();
    this.context = {
      componentParent: this
    };

    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };

    this.columnDefs = [
      {
        field: 'id',
        headerName: '#',
        width: 50
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 100
      },
      {
        field: 'updatedBy',
        headerName: 'Updated By',
      },
      {
        field: 'updateDate',
        headerName: 'Last Modified',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.data.updateDate, 'yyyy-MM-dd  h:mm:ss');
        }
      },
      {
        headerName: 'Action(s)',
        cellRenderer: 'buttonRenderer',
        valueGetter: function (params) {
          return {
            _id: params.data.id,
            params: params
          };
        },
      },
    ];
    this.defaultColDef = {
      width: 170,
      sortable: true,
    };
  }

  ngOnInit() {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    this.userRoleService.getAll()
      .subscribe(data => this.rowData = data);
    this.gridApi.setDomLayout('autoHeight');
  }


  viewRecord(id) {
    this.spinnerService.show();
    this.userRoleService.getById(id).subscribe((data) => {
      this.spinnerService.hide();
      this._record = data;
      this.modalService.open(this.viewRecordElmRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onBtCSVExport() {
    const params = {
      columnKeys: ['id', 'type', 'description', 'updatedBy', 'updatedAt'],
      fileName: 'User Roles'
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onPageSizeChanged() {
    this.gridApi.paginationSetPageSize(Number(this.pageSize));
  }

  searchRecords(val) {
    this.gridApi.setQuickFilter(val);
  }
}


