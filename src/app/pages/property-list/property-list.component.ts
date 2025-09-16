import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import { PropertyCardComponent } from '../../shared/property-card/property-card.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent
  ],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @Input() properties: Property[] = [];
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  private propertyService = inject(PropertyService);

  ngOnInit(): void {
    this.propertyService.getProperties({ limit: 6 }).subscribe({
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