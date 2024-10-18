import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users/current`;  // URL da API
  constructor(private http: HttpClient) { }

  // Get a single post by ID
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, {headers: headers});
  }
}
