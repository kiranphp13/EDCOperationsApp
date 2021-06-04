import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactTypeService } from '../../services/contact-type.service';
import { ButtonRendererComponent } from './renderer/button-renderer.component';


@Component({
  selector: 'app-contact-types',
  templateUrl: './contact-types.component.html',
  styleUrls: ['./contact-types.component.css']
})
export class ContactTypesComponent implements OnInit {

  records;
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: any;
  frameworkComponents: any;

  constructor(private http: HttpClient, private contactTypeService: ContactTypeService) {

    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
    this.columnDefs = [
      {
        field: 'id'

      },
      {
        field: 'type'
     
      },
      {
        field: 'description'
      
      },
      {
        field: 'updatedBy'
      },
      {
        field: 'updatedAt'
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

    this.contactTypeService.getAll()
      .subscribe(data => this.rowData = data);
    /*
    this.http
      .get('http://localhost:58639/api/ContactType/GetPosts')
      .subscribe((data) => {
        this.rowData = data;
        this.gridApi.sizeColumnsToFit();
      }); */
  }

}
