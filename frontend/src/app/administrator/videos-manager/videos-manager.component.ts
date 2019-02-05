import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-videos-manager',
  templateUrl: './videos-manager.component.html',
  styleUrls: ['./videos-manager.component.css','../style.css']
})
export class VideosManagerComponent implements OnInit {
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
        http.patch(environment.baseUrl + 'api/video', event.data).subscribe();
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
      {headerName: 'reference', field: 'reference', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
      {headerName: 'position', field: 'position'},
      {headerName: 'views', field: 'views'}
    ];


  }

  reDraw() {
    this.http.get(environment.baseUrl + 'api/video').subscribe(data => {
      this.rowData = data as any[];
      this.api.redrawRows(this.rowData);
    });
  }

  ngOnInit() {
  }

}
