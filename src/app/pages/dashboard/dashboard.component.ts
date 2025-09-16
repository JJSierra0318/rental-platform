import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import { PropertyCardComponent } from '../../shared/property-card/property-card.component';
import { PropertyListComponent } from '../property-list/property-list.component';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PropertyListComponent,
    SearchBoxComponent, 
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  properties: Property[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private propertyService = inject(PropertyService);
  private alertService = inject(AlertService); 

  ngOnInit(): void {
    this.successMessage = this.alertService.message;
    this.alertService.clear();
    this.loadProperties(); 
  }

  loadProperties(filters: any = {}) {
    this.isLoading = true;
    this.errorMessage = null;

    this.propertyService.getProperties({ limit: 12, ...filters }).subscribe({
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
  
  performSearch(filters: any) {
    const apiFilters = { city: filters.type, q: filters.query };
    this.loadProperties(apiFilters);
  }
}