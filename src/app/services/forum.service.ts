import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = `${environment.apiUrl}/forums`;  // URL da API

  constructor(private http: HttpClient) { }

  // Obtém todos os fóruns
  getForums(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response),  // Manipule a resposta conforme necessário
      catchError(this.handleError<any>('getForums', []))  // Tratamento de erros
    );
  }

  // Obtém um fórum específico pelo ID
  getForumById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>(`getForumById id=${id}`))
    );
  }

  // Cria um novo fórum
  createForum(forumData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, forumData).pipe(
      catchError(this.handleError<any>('createForum'))
    );
  }

  // Atualiza um fórum existente
  updateForum(id: string, forumData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, forumData).pipe(
      catchError(this.handleError<any>('updateForum'))
    );
  }

  // Exclui um fórum
  deleteForum(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteForum'))
    );
  }

  // Função auxiliar para tratar erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
