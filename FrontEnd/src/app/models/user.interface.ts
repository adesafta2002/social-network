export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    gender?: string | number;
    birthDate?: string;
    locationId?: number;
    friendRequest?: string;
    relationshipId?: number;
    address?: string;
}

