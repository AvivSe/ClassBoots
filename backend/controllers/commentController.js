const Response = require('../models/comment');
const errorsController = require('../controllers/errorsController');


class commentController {

    static async creatComment(body){
        var result = null;
        var comment = new Comment(body);
        await comment.save(err => {
            if (err) {
                result = err;
                errorsController.logger(err,result);

            }
        });
        return result;
    }

    static async deleteComment(id) {
        let result = null;
        await Comment.findByIdAndDelete(id).catch(err => {
            result = err;
            errorsController.logger(err,result);

        });
        return result;
    };


    static async getComment(id) {
        let result = null;
        await Comment.findOne({_id: id}).then(com => {
            if (com)
                result = com;
            else
                result = {"ERROR":"video not found"};
        }).catch(err => {
            result = err;
            errorsController.logger(err,result);

        });
        return result;
    };
}