import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users/current`;  // URL da API
  constructor(private http: HttpClient) { }

  // Get a single post by ID
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
