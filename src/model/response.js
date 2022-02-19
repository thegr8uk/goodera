class Response {

    constructor(statusCode, description, data) {
        this.statusCode = statusCode;
        this.description = description;
        this.data = data;
    }

}

module.exports = Response;