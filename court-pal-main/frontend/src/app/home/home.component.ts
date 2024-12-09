import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ShortenPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  someText = 'This is some long text that needs to be shortened';
}
