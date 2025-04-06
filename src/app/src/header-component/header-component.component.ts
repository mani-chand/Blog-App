import { ChangeDetectionStrategy, Component,signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './header-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
  title = signal('Blogger')
  newBlog = signal('Add Blog')
  Profile = signal('Profile')
  Logout = signal('Logout')
}