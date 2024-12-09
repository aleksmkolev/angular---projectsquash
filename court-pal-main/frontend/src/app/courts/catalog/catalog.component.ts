import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Court } from '../../types/court';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  courts: Court[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCourts().subscribe((c) => {
      this.courts = c;
      this.isLoading = false;
    });
  };
}