import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property, PaginatedProperties } from '../models/property.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/properties`;

  getProperties(filters: { city?: string; page?: number; limit?: number; q?: string } = {}): Observable<Property[]> {
    
    let params = new HttpParams();
    if (filters.city) params = params.set('city', filters.city);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.q) params = params.set('q', filters.q);

    return this.http.get<PaginatedProperties>(this.apiUrl, { params }).pipe(
      map(response => response.items)
    );
  }

   getPropertyById(id: number): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Property>(url);
  }
}