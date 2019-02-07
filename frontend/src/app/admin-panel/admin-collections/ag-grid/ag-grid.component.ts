import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import { GridOptions } from 'ag-grid-community';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: any[];
  public columnDefs: any[];
  public api: any;
  public path: any;

  constructor(private http: HttpClient,public agGridService:AdminAgGridService) {
    this.agGridService.getData.subscribe(data=>{
      this.path= data.defs.url;
      this.gridOptions = <GridOptions>{
        animateRows: true,

        defaultColDef: {
          editable: true,
          resizable: true,
          sortable: true

        },
        onCellEditingStopped: function (event) {
          http.patch(environment.baseUrl + 'api' + data.defs.url, event.data).subscribe();
        },
        onGridReady: (params) => {
          this.reDraw();
          this.api = params.api;
          this.api.sizeColumnsToFit();
        }
      };
      this.columnDefs = data.defs.colmunDef

    });

  }

  reDraw() {
    this.http.get(environment.baseUrl + 'api' + this.path).subscribe(data => {
      this.rowData = data as any[];
      this.api.redrawRows(this.rowData);
    });
  }

  ngOnInit() {
  }

}
