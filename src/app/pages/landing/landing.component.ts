import { Component } from '@angular/core';
import { PropertyListComponent } from '../property-list/property-list.component';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    PropertyListComponent, 
    SearchBoxComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  performSearch(filters: any) {
    console.log('Buscando en Landing con:', filters);
  }
}
