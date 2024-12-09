import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditDetails } from '../../types/court';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
    selector: 'app-edit-court',
    standalone: true,
    imports: [FormsModule, LoaderComponent],
    templateUrl: './edit-court.component.html',
    styleUrls: ['./edit-court.component.css']
})
export class EditCourtComponent implements OnInit {
    @ViewChild('editForm') editForm: NgForm | undefined;
    court: EditDetails = {
        _id: '',
        name: '',
        symbol: '',
        currentPrice: 0,
        description: '',
        imageUrl: ''
    };
    isLoading: boolean = true;

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const courtId = this.route.snapshot.params['courtId'];

        this.apiService.getOneCourt(courtId).subscribe((court) => {
            this.court = court;
            this.isLoading = false;
        });
    }

    editCourt(): void {
        if (!this.court._id) return;

        this.apiService.updateCourt(
            this.court._id,
            this.court.name,
            this.court.symbol,
            this.court.currentPrice,
            this.court.description,
            this.court.imageUrl
        ).subscribe(() => this.router.navigate(['/courts', this.court?._id, 'details']));
    }

    onCancel(event: Event): void {
        event.preventDefault();
        history.back();
    }
}
