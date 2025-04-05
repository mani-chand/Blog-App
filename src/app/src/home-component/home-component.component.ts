import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  Blogs = signal<string[]>(['Importance of JavaScript','Basics of Angular','Reactjs vs Angularjs'])
  newBlogName:string = ''
  createBlog(){
    this.Blogs.update(prev => [...prev, this.newBlogName]);
    this.newBlogName = ''
  }
  
  deleteBlog(item:string){
    this.Blogs.update(prev => prev.filter(blog=>blog != item));
  }

}
