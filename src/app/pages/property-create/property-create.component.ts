import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../shared/services/property.service';
import { finalize, switchMap } from 'rxjs/operators';
import { DocumentService } from '../../shared/services/document.service';
import { of } from 'rxjs';

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
  selectedFile: File | null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private propertyService = inject(PropertyService);
  private documentService = inject(DocumentService);

  constructor() {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.propertyService.createProperty(this.propertyForm.value).pipe(
      switchMap(newProperty => {
        if (!this.selectedFile) {
          return of(newProperty); 
        }
        return this.documentService.uploadPropertyPhoto(newProperty.id, this.selectedFile);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (result) => {
        console.log('Proceso de creación y subida completado:', result);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en el proceso de creación:', err);
        this.errorMessage = 'Ocurrió un error. Asegúrate de que todos los campos y el archivo sean correctos.';
      }
    });
  }
}