import { Component,signal,OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import {HeaderComponentComponent} from './../header-component/header-component.component'
import { BlogService } from '../../services/blog.service';
import { PostsResponse } from '../../Models/Blog.types';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponentComponent,MatCardModule, MatButtonModule],
  templateUrl: './home-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {
  Blogs = signal<PostsResponse>({
    posts: [],
    total: 0,
    skip: 0,
    limit: 0,
    filter: function (arg0: (blog: any) => boolean): PostsResponse {
      throw new Error('Function not implemented.');
    }
  });

  newBlogName:string = ''

  constructor(private blogService: BlogService) { }

  ngOnInit(){
  this.blogService.getPosts().subscribe(
    response => {this.Blogs.set(response);console.log(response)},
    error => console.error('Error fetching data', error)
  );
  }

  getFirst50Words(text: string): string {
    const words = text.split(/\s+/); // Split by any whitespace
    const first50Words = words.slice(0, 50).join(' '); // Take the first 50 words
    return first50Words + (words.length > 50 ? '...' : ''); // Add '...' if there are more than 50 words
  }

}
