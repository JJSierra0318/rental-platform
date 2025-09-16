import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../shared/services/rental.service';
import { Rental } from '../../shared/models/rental.model';
import { RouterModule } from '@angular/router';

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

  ngOnInit(): void {
    this.rentalService.getOwnerRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.isLoading = false;
      },
      error: (err:any) => {
        console.error('Error fetching owner rentals:', err);
        this.errorMessage = 'No se pudieron cargar las solicitudes de renta.';
        this.isLoading = false;
      }
    });
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
    this.updateStatus(rentalId, 'accepted');
  }

  rejectRental(rentalId: number) {
    this.updateStatus(rentalId, 'rejected');
  }

  private updateStatus(rentalId: number, status: 'accepted' | 'rejected') {
    this.rentalService.updateRentalStatus(rentalId, status).subscribe({
      next: (updatedRental) => {
        console.log(`Solicitud ${rentalId} actualizada a ${status}`);
        this.loadRentals();
      },
      error: (err:any) => {
        console.error(`Error al actualizar la solicitud ${rentalId}:`, err);
        alert('No se pudo actualizar el estado de la solicitud.');
      }
    });
  }
}