import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post,newPost,PostsResponse} from './../Models/Blog.types'
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

  getPostsBytext(text:string|null): Observable<PostsResponse> {
    const postURL = `https://dummyjson.com/posts/search?q=${text}`
    return this.http.get<PostsResponse>(postURL);
  }

  createPosts(blog:newPost): Observable<any> {
    const postURL = `https://dummyjson.com/posts/add`
    return (this.http.post(postURL,JSON.stringify(blog),{
      headers: { 'Content-Type': 'application/json' }
    }))};

}
