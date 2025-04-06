import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostsResponse} from './../Models/Blog.types'
import { Observable } from 'rxjs';
import {Post} from './../Models/Blog.types'
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private allPostsUrl = 'https://dummyjson.com/posts';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.allPostsUrl);
  }
  getPostsById(id:string|null): Observable<Post> {
    const postURL = `https://dummyjson.com/posts/${id}`
    return this.http.get<Post>(postURL);
  }
}
