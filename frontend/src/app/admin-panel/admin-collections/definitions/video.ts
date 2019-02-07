export default {
  colmunDef: [
    {headerName: '', field: 'bulk-action', width: 55, editable: false, checkboxSelection: true},
    {headerName: 'id', field: '_id', sort: 'asc', width: 70, editable: false},
    {headerName: 'reference', field: 'reference', filter: 'agTextColumnFilter', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith','endsWith','equals']}},
    {headerName: 'position', field: 'position'},
    {headerName: 'views', field: 'views'},
    {headerName: 'comments', field: 'comments',valueFormatter:jsonFormatter}
  ],
  url: '/video'
}

function jsonFormatter(params) {
  console.log(params.value);
  return JSON.stringify(params.value);
}