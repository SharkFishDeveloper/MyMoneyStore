class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler;

//*this: The first argument to captureStackTrace specifies the object to which the stack trace should be attached, which in this case is the current ErrorHandler instance.

//*this.constructor: The second argument is a function that tells V8 where to start the stack trace. By passing this.constructor (which refers to the ErrorHandler constructor function), we're telling V8 to not include the internals of the ErrorHandler constructor in the stack trace. This is done to make the stack trace cleaner and more relevant to the actual error's origin rather than the details of our custom error setup.