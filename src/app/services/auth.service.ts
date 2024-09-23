import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;  // URL da API

  constructor(private http: HttpClient, private router:Router) {}

  // Método para login (por email ou username)
  login(login: string, password: string): Observable<any> {
    const body = { login, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Armazena o token no localStorage ou em outro lugar seguro
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  // Método para signup
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  // Método para validar o token
  validateToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/validate_token`, { headers });
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location.href = '/forums';
  }
}
