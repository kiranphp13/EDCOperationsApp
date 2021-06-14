import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactTypeService} from '../services/contact-type.service';
import {ButtonRendererComponent} from './renderer/button-renderer.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-types',
  templateUrl: './contact-types.component.html',
  styleUrls: ['./contact-types.component.css'],
  providers: [DatePipe]
})
export class ContactTypesComponent implements OnInit {
  @ViewChild('view_record', {static: false}) viewRecordElmRef: ElementRef;
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

  constructor(
    private http: HttpClient,
    private contactTypeService: ContactTypeService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private spinnerService: NgxSpinnerService
  ) {
    this.context = {componentParent: this};

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
        field: 'type',
        headerName: 'Name',
        width: 100
      },
      {
        field: 'description',
        headerName: 'Description',
        width: '100'

      },
      {
        field: 'updatedBy',
        headerName: 'Updated By',
        width: '80'
      },
      {
        field: 'updateDate',
        headerName: 'Last Modified',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.data.updateDate, 'yyyy-MM-dd  h:mm:ss');
        },
        width: '100'
      },
      {
        headerName: 'Action(s)',
        cellRenderer: 'buttonRenderer',
        width: 80,
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

    this.contactTypeService.getAll()
      .subscribe(data => this.rowData = data);

    this.gridApi.setDomLayout('autoHeight');
  }

  viewRecord(id) {
    this.spinnerService.show();
    this.contactTypeService.getById(id).subscribe((data) => {
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
      columnKeys: ['id', 'type', 'description', 'updatedBy', 'updatedAt'],
      fileName: 'Contact Types'
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
