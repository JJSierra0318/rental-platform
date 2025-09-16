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
}
