import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import { PropertyCardComponent } from '../../shared/property-card/property-card.component';
import { PropertyListComponent } from '../property-list/property-list.component';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PropertyListComponent,
    SearchBoxComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  properties: Property[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  private propertyService = inject(PropertyService);

  ngOnInit(): void {
    this.propertyService.getProperties({ limit: environment.defaultPageLimit }).subscribe({
      next: (data) => {
        this.properties = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
        this.errorMessage = 'No se pudieron cargar las propiedades. Inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }
  
  performSearch(filters: any) {
    console.log('Buscando en Dashboard con:', filters);
  }
}