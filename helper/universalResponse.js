const UniversalResponse = (status, msg, data) => {
    return {
        status: status,
        time: new Date().toLocaleDateString("en-US"),
        messages: msg,
        content: data == null ? {} : data
    }
}

const UniversalErrorResponse = (status, msg, data) => {
    return {
        status: status || 500,
        time: new Date().toLocaleDateString("in-ID"),
        messages: msg || "Internal Server Error",
        content: data == null ? {} : data
    }
}

module.exports = { UniversalResponse, UniversalErrorResponse }