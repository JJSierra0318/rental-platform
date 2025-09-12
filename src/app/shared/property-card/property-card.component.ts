import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
 @Input() property!: Property; 
}
