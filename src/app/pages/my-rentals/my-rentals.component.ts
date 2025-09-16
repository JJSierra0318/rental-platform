import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../shared/services/rental.service';
import { Rental } from '../../shared/models/rental.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.scss']
})
export class MyRentalsComponent implements OnInit {
  rentals: Rental[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  private rentalService = inject(RentalService);

  ngOnInit(): void {
    this.rentalService.getMyRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my rentals:', err);
        this.errorMessage = 'No se pudieron cargar tus rentas. Inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  createPayment(){
    alert('Pago generado exitosamente');
  }
}