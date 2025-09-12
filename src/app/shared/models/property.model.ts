// src/app/shared/models/property.model.ts
export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  status: 'available' | 'rented'; // Definimos los posibles estados
  imageUrl?: string; // La imagen es opcional y la añadimos aquí
  owner: {
    id: number;
    username: string;
  };
}