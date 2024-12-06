import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-court',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './add-court.component.html',
    styleUrl: './add-court.component.css'
})
export class AddCourtComponent {

    constructor(private apiService: ApiService, private router: Router) {}

    create(form: NgForm) {
        if (form.invalid) {
            console.error("Invalid create form");
            return;
        }
        
        const name = form.value.name;
        const symbol = form.value.symbol;
        const currentPrice = form.value.currentPrice;
        const description = form.value.description;
        const imageUrl = form.value.imageUrl;

        this.apiService.addCourt(name, symbol, currentPrice, description, imageUrl).subscribe(() => {
            this.router.navigate(['/courts']);
        });
        
    }
}
