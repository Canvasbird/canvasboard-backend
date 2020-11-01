// * HTTP STATUS 500
function httpStatus500(error){
    return {
        message:error.message,
        success:false
    }
}

// * HTTP STATUS 200
function httpStatus200(message, content){
    return {
        message:message,
        content:content,
        success:true
    }
}

module.exports = {
    httpStatus200,
    httpStatus500
}