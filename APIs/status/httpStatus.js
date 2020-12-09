// * HTTP STATUS 500
function httpStatus500(error){
    return {
        message:error.message,
        success:false
    }
}

// * HTTP STATUS 200
function httpStatus200(content, message){
    return {
        content:content,
        message:message,
        success:true
    }
}

module.exports = {
    httpStatus200,
    httpStatus500
}
