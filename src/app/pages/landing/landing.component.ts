import { Component, inject } from '@angular/core';
import { PropertyListComponent } from '../property-list/property-list.component';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';
import { Property } from '../../shared/models/property.model';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../shared/services/property.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    PropertyListComponent, 
    SearchBoxComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {
  properties: Property[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  private propertyService = inject(PropertyService);
  
  ngOnInit(): void {
    this.loadProperties({ limit: 6 }); 
  }

  performSearch(filters: any) {
    console.log('Buscando en Landing con:', filters);
    const apiFilters = { city: filters.type, q: filters.query, limit: 6 };
    this.loadProperties(apiFilters);
  }

  loadProperties(filters: any = {}) {
    this.isLoading = true;
    this.errorMessage = null;

    this.propertyService.getProperties(filters).subscribe({
      next: (data) => {
        this.properties = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
        this.errorMessage = 'No se pudieron cargar las propiedades.';
        this.isLoading = false;
      }
    });
  }
}
