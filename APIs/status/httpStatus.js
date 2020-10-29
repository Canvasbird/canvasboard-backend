// * HTTP STATUS 500
function httpStatus500(error, status=500){
    return {
        message:error.message,
        success:false
    }
}

// * HTTP STATUS 200
function httpStatus200(message, status=200){
    return {
        message:message,
        success:true
    }
}

module.exports = {
    httpStatus200,
    httpStatus500
}