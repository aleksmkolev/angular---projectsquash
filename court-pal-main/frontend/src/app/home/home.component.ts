import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        CapitalizePipe,
        ShortenPipe
    ]
})
export class HomeComponent implements OnInit {
    isVisible = false;
    showFullText = false;
    
    ngOnInit() {
        setTimeout(() => {
            this.isVisible = true;
        }, 1000);
    }

    toggleText() {
        this.showFullText = !this.showFullText;
    }
}
