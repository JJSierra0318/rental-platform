export interface PaginatedProperties {
  page: number;
  limit: number;
  total: number;
  items: Property[];
}
export interface Property {
  id: number;
  ownerId: number; // Añadido
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  status: 'available' | 'rented' | string;
  createdAt: string;
  imageUrl?: string;
  owner: {
    id: number;
    username: string;
  };
}