import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Property } from '../../shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import { switchMap } from 'rxjs/operators';

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

  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);

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
}