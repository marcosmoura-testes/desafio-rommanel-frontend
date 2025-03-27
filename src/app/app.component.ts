import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [NavbarComponent, RouterModule]
})
export class AppComponent {
  title = 'Admin Panel';
}
