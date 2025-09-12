import { Component } from '@angular/core';
import { PropertyListComponent } from '../property-list/property-list.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [PropertyListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
