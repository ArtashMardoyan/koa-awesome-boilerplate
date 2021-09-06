const statusCodes = {};

statusCodes[(exports.CONTINUE = 100)] = 'Continue';
statusCodes[(exports.SWITCHING_PROTOCOLS = 101)] = 'Switching Protocols';
statusCodes[(exports.PROCESSING = 102)] = 'Processing';
statusCodes[(exports.OK = 200)] = 'OK';
statusCodes[(exports.CREATED = 201)] = 'Created';
statusCodes[(exports.ACCEPTED = 202)] = 'Accepted';
statusCodes[(exports.NON_AUTHORITATIVE_INFORMATION = 203)] = 'Non Authoritative Information';
statusCodes[(exports.NO_CONTENT = 204)] = 'No Content';
statusCodes[(exports.RESET_CONTENT = 205)] = 'Reset Content';
statusCodes[(exports.PARTIAL_CONTENT = 206)] = 'Partial Content';
statusCodes[(exports.MULTI_STATUS = 207)] = 'Multi-Status';
statusCodes[(exports.MULTIPLE_CHOICES = 300)] = 'Multiple Choices';
statusCodes[(exports.MOVED_PERMANENTLY = 301)] = 'Moved Permanently';
statusCodes[(exports.MOVED_TEMPORARILY = 302)] = 'Moved Temporarily';
statusCodes[(exports.SEE_OTHER = 303)] = 'See Other';
statusCodes[(exports.NOT_MODIFIED = 304)] = 'Not Modified';
statusCodes[(exports.USE_PROXY = 305)] = 'Use Proxy';
statusCodes[(exports.TEMPORARY_REDIRECT = 307)] = 'Temporary Redirect';
statusCodes[(exports.PERMANENT_REDIRECT = 308)] = 'Permanent Redirect';
statusCodes[(exports.BAD_REQUEST = 400)] = 'Bad Request';
statusCodes[(exports.UNAUTHORIZED = 401)] = 'Unauthorized';
statusCodes[(exports.PAYMENT_REQUIRED = 402)] = 'Payment Required';
statusCodes[(exports.FORBIDDEN = 403)] = 'Forbidden';
statusCodes[(exports.NOT_FOUND = 404)] = 'Not Found';
statusCodes[(exports.METHOD_NOT_ALLOWED = 405)] = 'Method Not Allowed';
statusCodes[(exports.NOT_ACCEPTABLE = 406)] = 'Not Acceptable';
statusCodes[(exports.PROXY_AUTHENTICATION_REQUIRED = 407)] = 'Proxy Authentication Required';
statusCodes[(exports.REQUEST_TIMEOUT = 408)] = 'Request Timeout';
statusCodes[(exports.CONFLICT = 409)] = 'Conflict';
statusCodes[(exports.GONE = 410)] = 'Gone';
statusCodes[(exports.LENGTH_REQUIRED = 411)] = 'Length Required';
statusCodes[(exports.REQUEST_TOO_LONG = 413)] = 'Request Entity Too Large';
statusCodes[(exports.REQUEST_URI_TOO_LONG = 414)] = 'Request-URI Too Long';
statusCodes[(exports.UNSUPPORTED_MEDIA_TYPE = 415)] = 'Unsupported Media Type';
statusCodes[(exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416)] = 'Requested Range Not Satisfiable';
statusCodes[(exports.EXPECTATION_FAILED = 417)] = 'Expectation Failed';
statusCodes[(exports.IM_A_TEAPOT = 418)] = "I'm a teapot";
statusCodes[(exports.INSUFFICIENT_SPACE_ON_RESOURCE = 419)] = 'Insufficient Space on Resource';
statusCodes[(exports.METHOD_FAILURE = 420)] = 'Method Failure';
statusCodes[(exports.UNPROCESSABLE_ENTITY = 422)] = 'Unprocessable Entity';
statusCodes[(exports.LOCKED = 423)] = 'Locked';
statusCodes[(exports.FAILED_DEPENDENCY = 424)] = 'Failed Dependency';
statusCodes[(exports.PRECONDITION_REQUIRED = 428)] = 'Precondition Required';
statusCodes[(exports.TOO_MANY_REQUESTS = 429)] = 'Too Many Requests';
statusCodes[(exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431)] = 'Request Header Fields Too Large';
statusCodes[(exports.INTERNAL_SERVER_ERROR = 500)] = 'Server Error';
statusCodes[(exports.NOT_IMPLEMENTED = 501)] = 'Not Implemented';
statusCodes[(exports.BAD_GATEWAY = 502)] = 'Bad Gateway';
statusCodes[(exports.SERVICE_UNAVAILABLE = 503)] = 'Service Unavailable';
statusCodes[(exports.GATEWAY_TIMEOUT = 504)] = 'Gateway Timeout';
statusCodes[(exports.HTTP_VERSION_NOT_SUPPORTED = 505)] = 'HTTP Version Not Supported';
statusCodes[(exports.INSUFFICIENT_STORAGE = 507)] = 'Insufficient Storage';
statusCodes[(exports.NETWORK_AUTHENTICATION_REQUIRED = 511)] = 'Network Authentication Required';

exports.getStatusText = function (statusCode) {
    if (statusCodes.hasOwnProperty(statusCode)) {
        return statusCodes[statusCode];
    } else {
        throw new Error('Status code does not exist: ' + statusCode);
    }
};

exports.getStatusCode = function (reasonPhrase) {
    for (const key in statusCodes) {
        if (statusCodes[key] === reasonPhrase) {
            return parseInt(key, 10);
        }
    }
    throw new Error('Reason phrase does not exist: ' + reasonPhrase);
};
