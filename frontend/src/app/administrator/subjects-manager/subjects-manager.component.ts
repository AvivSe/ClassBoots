import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subjects-manager',
  templateUrl: './subjects-manager.component.html',
  styleUrls: ['./subjects-manager.component.css','../style.css']
})
export class SubjectsManagerComponent implements OnInit {

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
        http.patch(environment.baseUrl + 'api/subject', event.data).subscribe();
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
      {headerName: 'description', field: 'description'},
      {headerName: 'lectures', field: 'lectures'}
    ];


  }

  reDraw() {
    this.http.get(environment.baseUrl + 'api/subject').subscribe(data => {
      this.rowData = data as any[];
      this.api.redrawRows(this.rowData);
    });
  }

  ngOnInit() {
  }

}
