import { UserModel } from '@/src/models/user.model';

export interface ProjectModel {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  users: UserModel[];
  lastRetroDate?: string;
  coverImage?: string;
}
