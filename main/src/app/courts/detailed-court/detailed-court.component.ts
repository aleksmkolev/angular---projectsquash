import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourtDetails } from '../../types/court';
import { LoaderComponent } from '../../loader/loader.component';
import { UserForAuth } from '../../types/user';
import { UserService } from '../../user/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-detailed-court',
    standalone: true,
    imports: [LoaderComponent, RouterLink, DatePipe],
    templateUrl: './detailed-court.component.html',
    styleUrl: './detailed-court.component.css'
})
export class DetailedCourtComponent implements OnInit {
    court: CourtDetails | null = null;
    isLoading: boolean = true;
    currentUser: UserForAuth | null = null;

    isOwner: boolean = false;

    constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private userService: UserService) { }

    get courtId(): string {
        return this.route.snapshot.params['courtId'];
    }

    ngOnInit(): void {
        const courtId = this.courtId;

        this.userService.getProfile().subscribe({
            next: (user) => {
                this.currentUser = user;
            },
            error: (err) => {
                this.currentUser = null;
            },
        });

        this.apiService.getOneCourt(courtId).subscribe({
            next: (court: CourtDetails) => {
                this.court = court;
                this.isLoading = false;

                this.checkOwnership(court);
            },
            error: (err) => {
                this.isLoading = false;
            },
        });
    }

    deleteCourt() {
        const choice = confirm("Are you sure you want to delete that court?");
        if (!choice) {
            return;
        }

        const courtId = this.courtId;

        this.apiService.deleteCourt(courtId).subscribe(() => {
            this.router.navigate(['/courts']);
        });
    }

    addComment(inputText: HTMLTextAreaElement) {
        const text = inputText.value.trim();
    
        if (!text) {
            return;
        }
    
        if (!this.court) {
            return;
        }
    
        this.apiService.addComment(this.courtId, text).subscribe({
            next: (newComment) => {
                if (!this.court!.comments) {
                    this.court!.comments = [];
                }

                this.court!.comments.push(newComment);
    
                inputText.value = '';
    
                console.log(newComment);
            },
            error: (err) => {
                console.error('Failed to add comment:', err);
            },
        });
    }
    

    private checkOwnership(court: CourtDetails): void {
        this.isOwner = court.owner?._id == this.currentUser?._id;
    }
}
