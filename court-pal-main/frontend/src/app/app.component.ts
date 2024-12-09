import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AuthenticateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  private readonly CLEAR_FLAG_KEY = 'initialClearPerformed';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.clearUserSessionOnce();
  }

  private clearUserSessionOnce() {
    
    if (!localStorage.getItem(this.CLEAR_FLAG_KEY)) {
      
      const items = { ...localStorage };
      localStorage.clear();
      
      
      sessionStorage.clear();
      
      
      localStorage.setItem(this.CLEAR_FLAG_KEY, 'true');
      
      
      this.http.post('/api/users/clear-session', {}, { withCredentials: true })
        .subscribe({
          error: (err) => console.error('Error clearing session:', err)
        });
    }
  }
}