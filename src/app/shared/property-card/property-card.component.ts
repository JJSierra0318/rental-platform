import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Property } from '../models/property.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
 @Input() property!: Property; 

 get propertyImageUrl(): string {
    if (this.property.documents && this.property.documents.length > 0) {
      return this.property.documents[0].storageUrl;
    }
    return 'https://via.placeholder.com/400x250.png?text=Sin+Imagen';
  }
}
