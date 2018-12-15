
const getinstitutions =  function(req,res) {
    res.end(JSON.stringify([{'name':'Colman','address':'Rishon-Lezion'},{'name':'Colman','address':'Rishon-Lezion'}]));
};

// export all the http request handling functions
module.exports = {getinstitutions};