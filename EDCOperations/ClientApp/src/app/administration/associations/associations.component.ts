import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociationService } from '../services/association.service';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css'],
  providers: [DatePipe]
})
export class AssociationsComponent implements OnInit {
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

  constructor(private http: HttpClient, private associationService: AssociationService, private modalService: NgbModal, private datePipe:DatePipe) {

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
        field: 'description',
        headerName: 'Description',
      },
      {
        field: 'updatedBy',
        headerName: 'Updated By',
      },
      {
        field: 'updateDate',
        headerName: 'Last Modified',
        cellRenderer: (params) => {
          return this.datePipe.transform( params.data.updateDate,'yyyy-MM-dd  h:mm:ss');
        }
      },
      {
        headerName: 'Action(s)',
        // cellRenderer: 'buttonRenderer',
        // valueGetter: function (params) {
        //   return {
        //     _id: params.data.id,
        //     params: params
        //   };
        // },
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

    this.associationService.getAll()
      .subscribe(data => this.rowData = data);
    /*
    this.http
      .get('http://localhost:58639/api/ContactType/GetPosts')
      .subscribe((data) => {
        this.rowData = data;
        this.gridApi.sizeColumnsToFit();
      }); */
  }


  // viewRecord(id){
  //   this.contactTypeService.getById(id).subscribe((data) => {
  //     console.log(data);
  //     this._record = data;
  //
  //     this.modalService.open(this.viewRecordElmRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });
  //   });
  // }
  //
  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  //
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  onBtCSVExport() {
    const params = {
      columnKeys: ['id', 'type', 'description', 'updatedBy', 'updatedAt'],
      fileName: 'Associations'
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


