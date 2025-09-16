import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ContractService } from '../../shared/services/contract.service';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-contract-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule, PdfViewerComponent],
  templateUrl: './contract-viewer.component.html',
  styleUrls: ['./contract-viewer.component.scss']
})
export class ContractViewerComponent implements OnInit {
  pdfUrl: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  private route = inject(ActivatedRoute);
  private contractService = inject(ContractService);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const contractId = Number(params.get('id'));
        if (!contractId) throw new Error('Contract ID not found');
        return this.contractService.getContractDownloadUrl(contractId);
      })
    ).subscribe({
      next: (response) => {
        this.pdfUrl = response.downloadUrl;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'No se pudo cargar el contrato.';
        this.isLoading = false;
      }
    });
  }
}