export type UserRole = 'PM' | 'User';

export interface UserModel {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}

export interface UserResponse {
  items: UserModel[];
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
