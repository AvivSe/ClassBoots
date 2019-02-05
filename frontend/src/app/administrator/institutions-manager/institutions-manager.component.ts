import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-institutions-manager',
  templateUrl: './institutions-manager.component.html',
  styleUrls: ['./institutions-manager.component.css','../style.css']
})
export class InstitutionsManagerComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: any[];
  public columnDefs: any[];
  public api: any;

  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      animateRows: true,

      defaultColDef: {
        editable: true,
        resizable: true,
        sortable: true

      },
      onCellEditingStopped: function (event) {
        http.patch(environment.baseUrl + 'api/institution', event.data).subscribe();
      },
      onGridReady: (params) => {
        this.reDraw();
        this.api = params.api;
        this.api.sizeColumnsToFit();
      }
    };
    this.columnDefs = [
      {headerName: '', field: 'bulk-action', width: 55, editable: false, checkboxSelection: true},
      {headerName: 'id', field: '_id', sort: 'asc', width: 70, editable: false},
      {headerName: 'name', field: 'name', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
      {headerName: 'address', field: 'address'},
      {headerName: 'Schools', field: 'schools',cellEditor: "agLargeTextCellEditor"},
      {headerName: 'email suffix', field: 'suffix'},
      {headerName: 'Location', field: 'geolocation'},
      {headerName: 'Image', field: 'image'}


    ];


  }

  reDraw() {
    this.http.get(environment.baseUrl + 'api/institution').subscribe(data => {
      this.rowData = data as any[];
      this.api.redrawRows(this.rowData);
    });
  }

  ngOnInit() {
  }

}
