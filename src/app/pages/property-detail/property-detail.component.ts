import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Property } from '../../shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import { switchMap } from 'rxjs/operators';
import { RentalService } from '../../shared/services/rental.service';
import { AuthService } from '../../shared/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  rentalRequestError: string | null = null;

  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);
  private rentalService = inject(RentalService);
  authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (id) {
          return this.propertyService.getPropertyById(id);
        }
        throw new Error('Property ID not found');
      })
    ).subscribe({
      next: (data) => {
        this.property = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching property details:', err);
        this.errorMessage = 'No se pudo cargar la propiedad. Inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  requestRental() {
    if (!this.authService.isLoggedIn()) {
      this.alertService.set('Debes iniciar sesión para poder rentar una propiedad.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.property) {
      this.rentalService.createRental(this.property.id).subscribe({
        next: (response) => {
          this.alertService.set('¡Tu solicitud de renta ha sido enviada con éxito!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.rentalRequestError = 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.';
        }
      });
    }
  }

    deleteProperty(): void {
    if (!this.property) return;

    // 1. Pide confirmación al usuario
    const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.');

    // 2. Si el usuario confirma, procede a eliminar
    if (isConfirmed) {
      this.propertyService.deleteProperty(this.property.id).subscribe({
        next: () => {
          // 3. Si tiene éxito, muestra un mensaje y redirige
          this.alertService.set('Propiedad eliminada con éxito.');
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          // 4. Si hay un error, muéstralo
          console.error('Error al eliminar la propiedad:', err);
          alert('No se pudo eliminar la propiedad. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
}