export default {
  colmunDef: [
    {headerName: '', field: 'bulk-action', width: 55, editable: false, checkboxSelection: true},
    {headerName: 'id', field: '_id', sort: 'asc', width: 70, editable: false},
    {headerName: 'title', field: 'title', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
    {headerName: 'lecturer', field: 'lecturer'},
    {headerName: 'videos', field: 'videos',cellEditor: "agLargeTextCellEditor"},
    {headerName: 'description', field: 'description'}
  ],
  url: '/lecture'
}