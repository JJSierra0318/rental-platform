import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/rentals`;

  createRental(propertyId: number): Observable<any> {
    const body = { propertyId };
    return this.http.post<any>(this.apiUrl, body);
  }

   getMyRentals(): Observable<Rental[]> {
    const url = `${this.apiUrl}/me`;
    return this.http.get<Rental[]>(url);
  }

  getOwnerRentals(): Observable<Rental[]> {
    const url = `${this.apiUrl}/owner`;
    return this.http.get<Rental[]>(url);
  }

  updateRentalStatus(id: number, status: 'accepted' | 'rejected'): Observable<Rental> {
    const url = `${this.apiUrl}/${id}/status`;
    const body = { status };
    return this.http.patch<Rental>(url, body);
  }
}