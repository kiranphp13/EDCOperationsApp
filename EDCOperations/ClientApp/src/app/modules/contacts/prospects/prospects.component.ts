import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/shared/user.service';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { ProspectService } from '../services/prospect.service';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.css'],
  providers: [DatePipe]
})
export class ProspectsComponent implements OnInit {
  @ViewChild('view_record', {static: false}) viewRecordElmRef: ElementRef;
  records;
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public rowData: any;
  frameworkComponents: any;
  closeResult = '';
  context: any;
  pageSize = 10;
  _record;
  loggedUserRole;
  currentUser: any;
  constructor(private prospectService: ProspectService,
              private modalService: NgbModal,
              private datePipe: DatePipe,
              private spinnerService: NgxSpinnerService,
              private userService: UserService)
  {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
    this.loggedUserRole = this.currentUser.role;
    this.context = {componentParent: this};

    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.columnDefs = [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        filter: true
      },
      {
        field: 'first',
        headerName: 'First Name',
        width: 100,
        filter: true
      },
      {
        field: 'last',
        headerName: 'Last Name',
        width: 100,
        filter: true
      },
      {
        field: 'middle',
        headerName: 'Middle Name',
        width: 100,
        filter: true
      },
      {
        field: 'phone1',
        headerName: 'Phone',
        width: 100,
        filter: true
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 100,
        filter: true
      },
      // {
      //   field: 'description',
      //   headerName: 'Description',
      //   width: '100',
      //   filter: true
      //
      // },
      // {
      //   field: 'updatedBy',
      //   headerName: 'Updated By',
      //   width: '80',
      //   filter: true
      // },
      // {
      //   field: 'updateDate',
      //   headerName: 'Last Modified',
      //   cellRenderer: (params) => {
      //     return this.datePipe.transform(params.data.updateDate, 'yyyy-MM-dd  h:mm:ss');
      //   },
      //   width: '100',
      //   filter: true
      // },
      {
        headerName: 'Action(s)',
        cellRenderer: 'buttonRenderer',
        width: 80,
        filter: true,
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

  getUserRoleName() {
    return this.loggedUserRole;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    this.prospectService.getAll()
      .subscribe(data => this.rowData = data);

    this.gridApi.setDomLayout('autoHeight');
  }
  viewRecord(id) {
    this.spinnerService.show();
    this.prospectService.getById(id).subscribe((data) => {
      console.log(data);
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
      columnKeys: ['id', 'first', 'last', 'middle', 'email', 'phone1'],
      fileName: 'Prospects'
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
