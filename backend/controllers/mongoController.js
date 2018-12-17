const findById = function (model, req, res) {
    model.find({_id: req.params.id})
        .then(documents => {
            res.send(documents);
        }).catch(err => {
        console.log(err);
    });
};

module.exports = {findById};