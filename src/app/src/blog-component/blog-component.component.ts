import { Component,signal,WritableSignal,OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import {HeaderComponentComponent} from './../header-component/header-component.component'
import { ActivatedRoute } from '@angular/router';
import {Post} from './../../Models/Blog.types'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-blog-component',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponentComponent,MatCardModule, MatButtonModule],
  templateUrl: './blog-component.component.html',
  styleUrl: './blog-component.component.css'
})
export class BlogComponentComponent implements OnInit {
  id: string | null = null;
    Blog:WritableSignal<Post> = signal({
      id:0,
    title:"",
    body:"",
    tags:[],
    reactions: {
      likes:0,
      dislikes:0
    },
    views: 0,
    userId:0,
    });
  constructor(private route: ActivatedRoute,private blogService:BlogService) { }

  ngOnInit(): void {
    // Using snapshot to get the parameter
    this.id = this.route.snapshot.paramMap.get('id');

    // OR using an observable to get the parameter (for dynamic changes)
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.blogService.getPostsById(this.id).subscribe(
          response => {
            this.Blog.set(response);
            console.log(response);
          },
          error => console.error('Error fetching data', error)
        );
      }
    });
  }


}
