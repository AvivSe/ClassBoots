export default {
  colmunDef: [
    {headerName: '', field: 'bulk-action', width: 55, editable: false, checkboxSelection: true},
    {headerName: 'id', field: '_id', sort: 'asc', width: 70, editable: false},
    {headerName: 'name', field: 'name', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
    {headerName: 'subjects', field: 'subjects',cellEditor: "agLargeTextCellEditor"}
  ],
  url: '/school'
}