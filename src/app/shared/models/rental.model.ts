import { Property } from './property.model';

export interface Rental {
  id: number;
  propertyId: number;
  renterId: number;
  status: 'pending' | 'approved' | 'rejected' | string;
  createdAt: string;
  property: Partial<Property>; 
  renter?: {
    id: number;
    username: string;
    email: string;
  };
}