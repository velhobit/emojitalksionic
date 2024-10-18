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
    private apiUrlComments = `${environment.apiUrl}/comments`;

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    // Get posts with pagination
    getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
        const headers = localStorage.getItem('token') ? this.getAuthHeaders() : undefined;
        return this.http.get<Post[]>(`${this.apiUrl}?page=${page}&limit=${limit}`, { headers });
    }

    // Get a single post by ID
    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`);
    }

    // Create a new post
    createPost(post: any): Observable<Post> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<Post>(this.apiUrl, post, { headers });
    }

    // Update an existing post
    updatePost(id: string, post: Post): Observable<Post> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.patch<Post>(`${this.apiUrl}/${id}`, post, { headers });
    }

    like(postId: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.apiUrl}/${postId}/like`, {}, { headers });
    }

    dislike(postId: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete(`${this.apiUrl}/${postId}/unlike`, { headers });
    }

    // Delete a post
    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    createComment(post_uuid: string, content: string) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const comment = {
            comment: {  // Aqui você encapsula em um objeto 'comment'
                post_uuid: post_uuid,
                content: content
            }
        };
        return this.http.post<Post>(this.apiUrlComments, comment, { headers });
    }

    getComments(post_uuid: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrlComments}/post/${post_uuid}`);
    }

    removeComment(commentId: string): Observable<void> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.delete<void>(`${this.apiUrlComments}/${commentId}`, { headers });
    }
}
