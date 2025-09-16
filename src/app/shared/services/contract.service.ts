import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contracts`;

  generateContractPdf(contractId: number): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${contractId}/generate-pdf`, {});
  }

  getContractDownloadUrl(contractId: number): Observable<{ downloadUrl: string }> {
    return this.http.get<{ downloadUrl: string }>(`${this.apiUrl}/${contractId}/download-url`);
  }
}
