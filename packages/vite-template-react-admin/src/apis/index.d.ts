declare namespace API {
  interface ResponseError {
    code: number;
    error: string;
    message: string;
    statusCode: number;
  }
  interface ResponseRecords<T> {
    records: T[];
    total: number;
  }
}
