export default {
  colmunDef: [
    {headerName: '', field: 'bulk-action', width: 55, editable: false, checkboxSelection: true},
    {headerName: 'id', field: '_id', sort: 'asc', width: 70, editable: false},
    {headerName: 'email', field: 'email', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
    {headerName: 'password', field: 'password'},
    {headerName: 'Register Date', field: 'regDate'}
  ],
  url: '/user'
}