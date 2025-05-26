// handler for err handeling(status , message)
class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    };
};

module.exports = ExpressError;