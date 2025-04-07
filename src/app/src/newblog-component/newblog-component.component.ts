import { Component,ChangeDetectionStrategy, inject } from '@angular/core';
import {HeaderComponentComponent} from './../header-component/header-component.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BlogService} from './../../services/blog.service'
import {Post} from './../../Models/Blog.types'
@Component({
  selector: 'app-newblog-component',
  standalone: true,
  imports: [MatFormFieldModule,CommonModule,FormsModule,HeaderComponentComponent, MatButtonModule,MatInputModule],
  templateUrl: './newblog-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './newblog-component.component.css'
})
export class NewblogComponentComponent {
  blogTitle = ''
  description = ''
  tags = ''
  constructor(private blogService: BlogService) { }
  createBlog(){
    var newTags;
    if(this.tags.includes(',')){
      newTags = this.tags.split(',')
    }else{
      newTags = [this.tags]
    }
    var newBlog:Post = {
      id:300,
      title: this.blogTitle,
      body: this.description,
      tags: newTags,
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      views: 0,
      userId: 7,
    }
    this.blogService.createPosts(newBlog).subscribe(res=>console.log(res))
  }
}
