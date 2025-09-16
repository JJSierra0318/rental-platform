import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../shared/services/rental.service';
import { Rental } from '../../shared/models/rental.model';
import { RouterModule } from '@angular/router';
import { ContractService } from '../../shared/services/contract.service';
import { AlertService } from '../../shared/services/alert.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-owner-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './owner-rentals.component.html',
  styleUrls: ['./owner-rentals.component.scss']
})
export class OwnerRentalsComponent implements OnInit {
  rentals: Rental[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  private rentalService = inject(RentalService);
  private contractService = inject(ContractService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.isLoading = true;
    this.rentalService.getOwnerRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching owner rentals:', err);
        this.errorMessage = 'No se pudieron cargar las solicitudes de renta.';
        this.isLoading = false;
      }
    });
  }

  approveRental(rentalId: number) {
    this.updateStatus(rentalId, 'ACCEPTED');
  }

  rejectRental(rentalId: number) {
    this.updateStatus(rentalId, 'REJECTED');
  }

  private updateStatus(rentalId: number, status: 'ACCEPTED' | 'REJECTED') {
    if (status === 'REJECTED') {
      this.rentalService.updateRentalStatus(rentalId, status).subscribe({
        next: () => this.loadRentals(),
        error: (err: any) => alert('No se pudo actualizar el estado de la solicitud.')
      });
      return;
    }

    this.rentalService.updateRentalStatus(rentalId, status).pipe(
      switchMap(updatedRental => {
        return this.contractService.generateContractPdf(updatedRental.id);
      })
    ).subscribe({
      next: (contractResponse) => {
        console.log('Contrato generado exitosamente:', contractResponse);
        this.alertService.set('Solicitud aprobada y contrato generado con éxito.');
        this.loadRentals();
      },
      error: (err: any) => {
        console.error('Error en el proceso de aprobación:', err);
        alert('Ocurrió un error al aprobar la solicitud o generar el contrato.');
      }
    });
  }

  previewContract(contractId: number): void {
    this.contractService.getContractDownloadUrl(contractId).subscribe({
      next: (response) => {
        window.open(response.downloadUrl, '_blank');
      },
      error: (err: any) => {
        console.error('Error al obtener la URL del contrato:', err);
        alert('No se pudo obtener el enlace de descarga del contrato. Por favor, inténtalo de nuevo.');
      }
    });
  }
}