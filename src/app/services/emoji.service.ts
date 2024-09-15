import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

 constructor(private http: HttpClient) { }

 getEmojis(): Observable<any> {
   return this.http.get<any>("assets/emoji.json").pipe(
     map(response => response),  // Manipule a resposta conforme necessário
     catchError(this.handleError<any>('getEmojis', []))  // Tratamento de erros
   );
 }
 private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
     console.error(`${operation} failed: ${error.message}`);
     return of(result as T);
   };
 }
}
