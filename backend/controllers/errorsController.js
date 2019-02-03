class errorsController {

    static logger(err, description){
       console.log(err+': '+description);
    }


}
module.exports = errorsController;