import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../shared/services/property.service';
import { finalize, switchMap } from 'rxjs/operators';
import { Property } from '../../shared/models/property.model';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.scss']
})
export class PropertyEditComponent implements OnInit {
  propertyForm: FormGroup;
  isLoading = true;
  errorMessage: string | null = null;
  propertyId: number | null = null;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);

  constructor() {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      status: ['available', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.propertyId = Number(params.get('id'));
        if (!this.propertyId) throw new Error('Property ID not found');
        return this.propertyService.getPropertyById(this.propertyId);
      })
    ).subscribe({
      next: (property) => {
        this.propertyForm.patchValue(property);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'No se pudo cargar la propiedad para editar.';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.propertyForm.invalid || !this.propertyId) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.propertyService.updateProperty(this.propertyId, this.propertyForm.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (updatedProperty) => {
        this.router.navigate(['/property', this.propertyId]);
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al actualizar la propiedad.';
      }
    });
  }
}