import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        EmailDirective,
        CapitalizePipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    domains = DOMAINS;
    constructor(private userService: UserService, private router: Router) { }

    login(form: NgForm) {
        if(form.invalid) {
            console.error("Invalid login form");
            return;
        }

        const { email, password } = form.value;
        
        this.userService.login(email, password).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}
