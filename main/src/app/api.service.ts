import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Court, CourtDetails } from './types/court';
import { Comment } from './types/Comment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getCourts() {
        return this.http.get<Court[]>(`/api/courts`);
    }

    addCourt(name: string, symbol: string, currentPrice: number, description: string, imageUrl: string) {
        const payload = { name, symbol, currentPrice, description, imageUrl };
        return this.http.post<Court>('/api/courts/create', payload);
    }

    getOneCourt(id: string) {
        return this.http.get<CourtDetails>(`/api/courts/${id}/details`);
    }

    searchCourts(name: string, symbol: string) {
        let params = new HttpParams();

        if (name) {
            params = params.set('name', name);
        }
        if (symbol) {
            params = params.set('symbol', symbol);
        }

        return this.http.get<Court[]>('/api/courts/search', { params });
    }

    deleteCourt(id: string) {
        return this.http.delete(`/api/courts/${id}/delete`);
    }

    updateCourt(id: string, name: string, symbol: string, currentPrice: number, description: string, imageUrl: string) {
        const payload = { name, symbol, currentPrice, description, imageUrl };
        return this.http.put<CourtDetails>(`/api/courts/${id}/edit`, payload);
    }

    addComment(courtId: string, text: string) {
        const payload = { text };
        return this.http.post<Comment>(`/api/courts/${courtId}/comments`, payload);
    }

    updateComment(courtId: string, commentId: string, text: string) {
        const payload = { text };
        return this.http.put<Comment>(`/api/courts/${courtId}/comments/${commentId}`, payload);
    }

    deleteComment(courtId: string, commentId: string) {
        return this.http.delete(`/api/courts/${courtId}/comments/${commentId}`);
    }
}
