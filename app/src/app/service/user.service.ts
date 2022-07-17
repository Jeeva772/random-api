import { Injectable } from '@angular/core';
import { Response } from '../shared/response';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getCountryList(): Observable<Response> {
    return this.http.get<Response>('http://localhost:8000/users').pipe(retry(1), catchError(this.handleError));
  }

  public triggerBatchUpdate(): Observable<any>{
    return this.http.get<any>('http://localhost:8000/batchUpdate').pipe(retry(1), catchError(this.handleError));
  }
 // Error handling
 handleError(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}
}
