import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Post {
  uuid: string;
  title: string;
  content: string;
  forum_id: string;
  author_id: string;
  closure_date?: string;
  deletion_date?: string;
  last_update_date?: string;
  time_since_posted?: string;
  forum?: any;
  author?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) { }

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Get a single post by ID
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // Create a new post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, { post });
  }

  // Update an existing post
  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${id}`, { post });
  }

  // Delete a post
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
