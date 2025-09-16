import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../shared/services/property.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.scss']
})
export class PropertyCreateComponent {
  propertyForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private propertyService = inject(PropertyService);

  constructor() {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.propertyService.createProperty(this.propertyForm.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (newProperty) => {
        console.log('Propiedad creada exitosamente:', newProperty);
        // Redirige al dashboard o a la página de detalle de la nueva propiedad
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al crear la propiedad:', err);
        this.errorMessage = 'Ocurrió un error al publicar la propiedad. Por favor, inténtalo de nuevo.';
      }
    });
  }
}