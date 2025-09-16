import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/documents/upload`; 

  uploadPropertyPhoto(propertyId: number, file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('type', 'PROPERTY_PHOTO');
    formData.append('propertyId', propertyId.toString());
    return this.http.post(this.apiUrl, formData);
  }
}