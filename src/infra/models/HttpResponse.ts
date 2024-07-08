enum HttpStatusCode {
  ok = 200,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
