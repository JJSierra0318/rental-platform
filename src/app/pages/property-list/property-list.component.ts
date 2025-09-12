import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../shared/models/property.model';
import { PropertyCardComponent } from '../../shared/property-card/property-card.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent // <-- Lo importamos aquí
  ],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {
  // Por ahora, creamos datos de ejemplo. En el futuro, esto vendrá de una llamada a la API.
  properties: Property[] = [
    {
      id: 1,
      title: "Apartamento moderno en El Poblado",
      description: "Bonito apartamento con balcón",
      address: "Calle 123 #45",
      city: "Medellín",
      price: 2500000,
      status: "available",
      imageUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      owner: { id: 1, username: "juanito" }
    },
    {
      id: 2,
      title: "Casa familiar en Envigado",
      description: "Espaciosa casa con jardín y parqueadero.",
      address: "Carrera 50 #10-20",
      city: "Envigado",
      price: 4000000,
      status: "rented",
      imageUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      owner: { id: 2, username: "maria" }
    },
  ];
}