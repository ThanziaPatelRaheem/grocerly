class HttpError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    if (data) this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default HttpError;
