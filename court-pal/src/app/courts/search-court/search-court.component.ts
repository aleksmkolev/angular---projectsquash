import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Court } from '../../types/court';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { RouterLink } from '@angular/router';
import { CourtFilterPipe } from '../../shared/pipes/court-filter-pipe';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';

@Component({
    selector: 'app-search-court',
    standalone: true,
    imports: [
        FormsModule, 
        CommonModule, 
        LoaderComponent, 
        RouterLink,
        CourtFilterPipe,
        PriceFormatPipe
    ],
    templateUrl: './search-court.component.html',
    styleUrls: ['./search-court.component.css'],
})
export class SearchCourtComponent implements OnInit {
    courts: Court[] = [];
    isLoading = false;
    searchName: string = '';
    searchSymbol: string = '';

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getCourts().subscribe((data) => {
            this.courts = data;
        });
    }

    search(form: NgForm) {
        if(form.invalid) {
            return;
        }

        const { name, symbol } = form.value;
        this.searchName = name;
        this.searchSymbol = symbol;

        this.isLoading = true;

        this.apiService.searchCourts(name, symbol).subscribe(
            (data) => {
                this.courts = data;
                this.isLoading = false;
            },
        );
        form.reset();
    }
}
